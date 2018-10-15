import * as express from "express";
import { url } from "inspector";
import { Team } from "./Team.model";
import { TeamService } from "./Team.service";
import { ProfileService } from "../../account/profile/Profile.service";
import { MatchService } from "../match/Match.service";
import { SportService } from "../../account/sport/Sport.service";
import { MatchHelpers } from "../match/Match.helpers";
import { TeamsHelpers } from "./Teams.helpers";

export class TeamController {

    public static async All(req: express.Request, res: express.Response) {
        const TeamList = await TeamService.Find();
        return res.status(200).json(TeamList);
    }

    public static async Find(req: express.Request, res: express.Response) {
        const team = res.locals.team;
        return team ? res.status(200).json(team) : res.status(404).json({message: "match not found"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const teamName: string = req.body.teamName;
        const sport = res.locals.sportModel;
        const team = new Team();
        console.log("GENERER UN NOM DE TEAM SI VIDE");
        team.teamName = teamName;
        team.sport = sport;
        team.profileCount = 0;

        try {
            const Result = await TeamService.Save(team);
            return res.status(200).json(Result);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const idTeamJoin: number = req.body.idTeamJoin;
        const team = res.locals.team;

        if (idTeamJoin != null){
            const teamJoin = await TeamService.FindOneById(idTeamJoin);
            if (teamJoin == null){
                return res.status(404).json({message: "team you want to join doesn't exist"});
            }
            if (teamJoin.isFill){
                return res.status(404).json({message: "team you want to join is full"});
            }
            return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
        }

        const teams = await TeamService.FindBySportNotFill(team.sport);
        const teamJoin = TeamsHelpers.Closest(teams, team.ranking, team.id);

        if (teamJoin === undefined) {
            const teamName = ""
            const teamJoin = await TeamsHelpers.CreateTeam(teamName, team.sport);
            if (teamJoin == null){
                return res.status(404).json({error: "server error"});
            }
            return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
        }
        return TeamsHelpers.SaveAndReturnTeams(teamJoin, team, res);
    }

    public static async JoinMatch(teamId: number, res: express.Response) {
        const team = await TeamService.FindOneById(teamId);
        const matchs = await MatchService.FindBySportNotFill(team.sport);
        const match = MatchHelpers.Closest(matchs, team.ranking);

        if (match === undefined) {
            const match = await MatchHelpers.CreateMatch(team.sport);
            if (match == null){
                return res.status(404).json({error: "server error"});
            }
            return MatchHelpers.SaveAndReturn(match, team, res)
        }
        return MatchHelpers.SaveAndReturn(match, team, res)
    }

    public static async JoinMatchReq(req: express.Request, res: express.Response) {
        const team = res.locals.team;
        const matchs = await MatchService.FindBySportNotFill(team.sport);
        const match = MatchHelpers.Closest(matchs, team.ranking);

        if (match === undefined) {
            const match = await MatchHelpers.CreateMatch(team.sport);
            if (match == null){
                return res.status(404).json({error: "server error"});
            }
            return MatchHelpers.SaveAndReturn(match, team, res)
        }
        return MatchHelpers.SaveAndReturn(match, team, res)
    }

}
