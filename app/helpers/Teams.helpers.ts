import * as express from "express";
import { url } from "inspector";
import { Team } from "../models/Team.model"
import { Profile } from "../models/Profile.model"
import { TeamService } from "../services/Team.service"
import { ProfileService } from "../services/Profile.service"

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
        team.profile.forEach(function(element) {
            sum += Number(element.ranking);
        });
        sum += Number(rank);
        var averrage = Number(sum) / Number((team.profile.length + 1));
        team.ranking = averrage;

        return averrage;
    }

    public static async SaveAndReturn(team: Team, profile: Profile, res: express.Response) {
        if (team.profile.length <= 0){
            team.ranking = profile.ranking;
        } else {
            team.ranking = TeamsHelpers.AverageRank(team, profile.ranking);
        }

        try {
            await TeamService.Save(team);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }

        profile.team = team;

        try {
            const Result = await ProfileService.Save(profile);
            return res.status(200).json(Result);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async CreateTeam(teamName: string, sport: string) : Promise<Team> {
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
