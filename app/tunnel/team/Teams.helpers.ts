import * as express from "express";
import { Team } from "./Team.model"
import { Profile } from "../../account/profile/Profile.model"
import { Sport } from "../../account/sport/Sport.model";
import { TeamService } from "./Team.service"
import { ProfileService } from "../../account/profile/Profile.service"
import { TeamController } from "./Team.Controller"
import { TeamLeaderController } from "../teamLeader/TeamLeader.controller";
import { ResultHelpers } from "../../helpers/Result.helpers"

export class TeamsHelpers {
    public static Closest(teams: Team[], num: number, toNotFind: number): Team {
        var toNotFindBool = (typeof toNotFind !== 'undefined')
        var i = 0;
        var minDiff = 4000;
        var team;

        teams.forEach(function (element) {
            if (toNotFindBool && element.id == toNotFind) {
                return;
            }
            var m = Math.abs(num - element.ranking);
            if (m < minDiff) {
                minDiff = m;
                team = element;
            }
        });

        return team;
    }

    public static AverageRank(team: Team, rank: number): number {
        var sum = Number(0);
        team.profiles.forEach(function (element) {
            sum += Number(element.ranking);
        });
        sum += Number(rank);
        var averrage = Number(sum) / Number(((team.profiles ? team.profiles.length : 0) + 1));
        team.ranking = averrage;

        return averrage;
    }

    public static GetTeamLeader(team: Team): Profile {
        var t;
        var max = -Infinity;
        team.profiles.forEach(function (element) {
            if (Number(element.ranking) > Number(max)) {
                max = element.ranking;
                t = element;
            }
        });

        return t;
    }

    public static async SaveAndReturn(team: Team, profile: Profile, res: express.Response) {

        if (!profile.team) {
            if (!team.profiles || team.profiles.length <= 0) {
                team.ranking = profile.ranking;
                team.profileCount = 1;
            } else {
                team.ranking = TeamsHelpers.AverageRank(team, profile.ranking);
                team.profileCount = ((team.profiles ? team.profiles.length : 0) + 1);
            }
            if (team.profileCount == (team.sport.nbPlayers / team.sport.nbTeam)) {
                team.isFill = true;
                var t = this.GetTeamLeader(team);
                var teamLeader = await TeamLeaderController.Create(t, team);
                team.teamLeader = teamLeader;
            }
            try {
                await TeamService.Save(team);
            } catch (ex) {
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            profile.team = team;
            try {
                const Result = await ProfileService.Save(profile);
                if (team.isFill) {
                    return TeamController.JoinMatch(Result.team.id, res)
                }
                return res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result));
            } catch (ex) {
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
        } else {
            console.log("ENVOYER VERS FONCTION JOINTEAM DE TEAM")
            return res.status(200).json(ResultHelpers.createReturnJson(200, "success", { team: "you already have a team" }));
        }
    }

    public static AverageRankTeam(team: Team): number {
        var sum = Number(0);
        team.profiles.forEach(function (element) {
            sum += Number(element.ranking);
        });
        var averrage = Number(sum) / Number(((team.profiles ? team.profiles.length : 1)));
        team.ranking = averrage;

        return averrage;
    }

    public static async SaveAndReturnTeams(teamJoin: Team, team: Team, res: express.Response) {
        if ((teamJoin.profileCount + team.profileCount) > (team.sport.nbPlayers / team.sport.nbTeam)) {
            return res.status(400).json(ResultHelpers.createReturnJson(400, "error", { team: "you are too much for this team" } ));
        }

        team.profiles.forEach(function (element) {
            teamJoin.profiles.push(element);
        });

        if (!teamJoin.profiles || teamJoin.profiles.length <= 0) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        } else {
            teamJoin.ranking = TeamsHelpers.AverageRankTeam(teamJoin);
            teamJoin.profileCount = ((teamJoin.profiles ? teamJoin.profiles.length : 1));
        }
        if (teamJoin.profileCount == (teamJoin.sport.nbPlayers / teamJoin.sport.nbTeam)) {
            teamJoin.isFill = true;
        }
        try {
            const Result = await TeamService.Save(teamJoin);
            await TeamService.RemoveById(team.id);
            return res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }

    public static async CreateTeam(teamName: string, sport: Sport): Promise<Team> {
        const team = new Team();
        team.teamName = teamName
        team.sport = sport;
        team.isFill = false;
        team.profileCount = 1;

        try {
            const Result = await TeamService.Save(team);
            return (Result);
        } catch (ex) {
            return (null)
        }
    }
}
