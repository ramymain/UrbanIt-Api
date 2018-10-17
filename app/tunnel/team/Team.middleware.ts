import * as express from "express";
import { TeamService } from "./Team.service"
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"

export async function TeamExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idTeam: number = req.params.idTeam != null ? req.params.idTeam : req.body.idTeam != null ? req.body.idTeam : res.status(404).json({error: "we need idTeam"});
    const team = await TeamService.FindOneById(idTeam);
    res.locals.team = team;
    team ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "team": "team doesn't exist" }));
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.sport)){
        errors.sport = "we need sport";
    }
    // if (StringHelpers.isNullOrWhitespace(req.body.teamName)){
    //     res.status(404).json({error: "we need teamName"});
    // }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckJoinTeam(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.idTeam)){
        errors.idTeam = "we need idTeam";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckJoinMatch(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.idTeam)){
        errors.idTeam = "we need idTeam";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}