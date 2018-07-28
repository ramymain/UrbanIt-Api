import * as express from "express";
import { url } from "inspector";
import { Team } from "../models/Team.model";
import { TeamService } from "../services/Team.service";

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
        const teamname: string = req.body.teamname;
        const sport: string = req.body.sport;
        const team = new Team();
        console.log("GENERER UN NOM DE TEAM SI VIDE");
        team.teamname = teamname;
        team.sport = sport;

        try {
            const Result = await TeamService.Save(team);
            return res.status(200).json(Result);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

}
