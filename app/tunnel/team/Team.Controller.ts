import * as express from "express";
import { url } from "inspector";
import { Team } from "./Team.model";
import { TeamService } from "./Team.service";
import { ProfileService } from "../../account/profile/Profile.service";
import { MatchService } from "../match/Match.service";
import { SportService } from "../../account/sport/Sport.service";
import { MatchHelpers } from "../match/Match.helpers";
import { TeamsHelpers } from "./Teams.helpers";
import { ResultHelpers } from "../../helpers/Result.helpers"

export class TeamController {

    public static async All(req: express.Request, res: express.Response) {
        const TeamList = await TeamService.Find();
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", TeamList))
    }

    public static async Find(req: express.Request, res: express.Response) {
        const team = res.locals.team;
        return team ? res.status(200).json(ResultHelpers.createReturnJson(200, "success", team)) : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "match": "team doesn't exist" }));
    }

    public static async Create(req: express.Request, res: express.Response) {
        const teamName: string = req.body.teamName;
        const sport = res.locals.sportModel;
        const team = new Team();
        team.teamName = teamName;
        team.sport = sport;
        team.profileCount = 0;
        team.isFill = false;

        try {
            const Result = await TeamService.Save(team);
            return res.status(201).json(ResultHelpers.createReturnJson(201, "success", Result))
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const idTeamJoin: number = req.body.idTeamJoin;
        const team = res.locals.team;

        if (idTeamJoin != null){
            const teamJoin = await TeamService.FindOneById(idTeamJoin);
            if (teamJoin == null){
                return res.status(404).json(ResultHelpers.createReturnJson(404, "error", { team: "team you want to join doesn't exist" }));
            }
            if (teamJoin.isFill){
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", { server: "team is full" }));
            }
            return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
        }

        const teams = await TeamService.FindBySportNotFill(team.sport);
        const teamJoin = TeamsHelpers.Closest(teams, team.ranking, team.id);

        if (teamJoin === undefined) {
            const teamName = ""
            const teamJoin = await TeamsHelpers.CreateTeam(teamName, team.sport);
            if (teamJoin == null){
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
        }
        return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
    }

    public static async JoinMatch(teamId: number, res: express.Response, profileId: number) {
        const team = await TeamService.FindOneById(teamId);
        const matchs = await MatchService.FindBySportNotFill(team.sport);
        const match = MatchHelpers.Closest(matchs, team.ranking);

        if (match === undefined) {
            const match = await MatchHelpers.CreateMatch(team.sport);
            if (match == null){
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            return MatchHelpers.SaveAndReturn(match, team, res, profileId)
        }
        return MatchHelpers.SaveAndReturn(match, team, res, profileId)
    }

    public static async JoinMatchReq(req: express.Request, res: express.Response) {
        const team = res.locals.team;
        const profile = res.locals.profile;
        if (!team.isFill) {
            return res.status(403).json({error: "your team isn't fill"});
        }
        const matchs = await MatchService.FindBySportNotFill(team.sport);
        const match = MatchHelpers.Closest(matchs, team.ranking);

        if (match === undefined) {
            const match = await MatchHelpers.CreateMatch(team.sport);
            if (match == null){
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            return MatchHelpers.SaveAndReturn(match, team, res, profile.id)
        }
        return MatchHelpers.SaveAndReturn(match, team, res, profile.id)
    }

}
