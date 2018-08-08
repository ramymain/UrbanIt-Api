import * as express from "express";
import { url } from "inspector";
import { Team } from "../models/Team.model"
import { Profile } from "../models/Profile.model"
import { Sport } from "../models/Sport.model";
import { TeamService } from "../services/Team.service"
import { ProfileService } from "../services/Profile.service"
import { TeamController } from "../controllers/Team.Controller"

export class TeamsHelpers {
    public static Closest(teams: Team[], num: number): Team{
        var i=0;
        var minDiff=4000;
        var team;

        teams.forEach(function(element) {
            var m = Math.abs(num - element.ranking);
            if(m < minDiff){ 
                   minDiff = m; 
                   team = element; 
               }
        });

        return team;
    }

    public static AverageRank(team: Team, rank: number): number {
        var sum = Number(0);
        team.profiles.forEach(function(element) {
            sum += Number(element.ranking);
        });
        sum += Number(rank);
        var averrage = Number(sum) / Number(((team.profiles ? team.profiles.length: 0) + 1));
        team.ranking = averrage;

        return averrage;
    }

    public static async SaveAndReturn(team: Team, profile: Profile, res: express.Response) {

        if (!profile.team) {
            if (!team.profiles || team.profiles.length <= 0){
                team.ranking = profile.ranking;
                team.profileCount = 1;
            } else {
                team.ranking = TeamsHelpers.AverageRank(team, profile.ranking);
                team.profileCount = ((team.profiles ? team.profiles.length: 0) + 1);
            }
            if (team.profileCount == (team.sport.nbPlayers / team.sport.nbTeam))
            {
                team.isFill = true;
            }
            try {
                await TeamService.Save(team);
            } catch (ex) {
                return res.status(404).json({error: "server error"});
            }
            profile.team = team;
            try {
                const Result = await ProfileService.Save(profile);
                if (team.isFill)
                {
                    console.log("join match");
                    TeamController.JoinMatch(team, res)
                }
                return res.status(200).json(Result);
            } catch (ex) {
                return res.status(404).json({error: "server error"});
            }
        } else {
            console.log("ENVOYER VERS FONCTION JOINTEAM DE TEAM")
            return res.status(200).json({message: "you already have team"});
        }
    }

    public static async CreateTeam(teamName: string, sport: Sport) : Promise<Team> {
        const team = new Team();
        console.log("GENERER UN NOM DE TEAM SI VIDE");
        team.teamName = teamName;
        team.sport = sport;

        try {
            const Result = await TeamService.Save(team);
            return (Result);
        } catch (ex) {
            return (null)
        }
    }
}
