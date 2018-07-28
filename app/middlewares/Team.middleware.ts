import * as express from "express";
import { TeamService } from "../services/Team.service"
import { StringHelpers } from "../helpers/String.helpers"

export async function TeamExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idTeam: number = req.params.idTeam != null ? req.params.idTeam : req.body.idTeam != null ? req.body.idTeam : res.status(404).json({error: "we need idTeam"});
    const user = await TeamService.FindOneById(idTeam);
    user ? next() : res.status(404).json({error: "team doesn't exist"});
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.sport)){
        res.status(404).json({error: "we need sport"});
    }
    // if (StringHelpers.isNullOrWhitespace(req.body.teamName)){
    //     res.status(404).json({error: "we need teamName"});
    // }
    else {
        next();
    }
}