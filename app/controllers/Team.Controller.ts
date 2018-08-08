import * as express from "express";
import { url } from "inspector";
import { Team } from "../models/Team.model";
import { TeamService } from "../services/Team.service";
import { MatchService } from "../services/Match.service";
import { SportService } from "../services/Sport.service";
import { MatchHelpers } from "../helpers/Match.helpers";

export class TeamController {

    public static async All(req: express.Request, res: express.Response) {
        const TeamList = await TeamService.Find();
        return res.status(200).json(TeamList);
    }

    public static async Find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const profile = await TeamService.FindOneById(id);
        return profile ? res.status(200).json(profile) : res.status(404).json({message: "match not found"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const teamName: string = req.body.teamName;
        const sport = await SportService.FindBySport(req.body.sport);
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

    public static async JoinMatch(team: Team, res: express.Response) {
        const matchs = await MatchService.FindBySportNotFill(team.sport);
        console.log("matches:" + matchs);
        const match = MatchHelpers.Closest(matchs, team.ranking);
        console.log("match:" + match);

        if (match === undefined) {
            const match = await MatchHelpers.CreateMatch(team.sport);
            console.log("matchcreate:" + match);
            if (match == null){
                return res.status(404).json({error: "server error"});
            }
            return MatchHelpers.SaveAndReturn(match, team, res)
        }
        return MatchHelpers.SaveAndReturn(match, team, res)
    }

}
