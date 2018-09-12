import * as express from "express";
import { TeamService } from "../services/Team.service";
import { TeamsHelpers } from "../helpers/Teams.helpers";

export class TestController {

    public static async GetTeamLeader(req: express.Request, res: express.Response) {
        const id: number = req.body.idTeam;
        const team = await TeamService.FindOneById(id);
        const leader = TeamsHelpers.GetTeamLeader(team);
        return res.status(200).json(leader);
    }

}
