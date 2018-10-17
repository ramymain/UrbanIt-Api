import * as express from "express";
import { TeamService } from "../tunnel/team/Team.service"
import { StringHelpers } from "../helpers/String.helpers"
import { ProfileService } from "../account/profile/Profile.service";
import { TeamLeaderService } from "../tunnel/teamLeader/TeamLeader.service";
import { ResultHelpers } from "../helpers/Result.helpers"

export async function CheckEntry(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)){
        errors.idProfile = "we need idProfile";
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.idTeamScore)){
        errors.idTeamScore = "we need idTeamScore";
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.score)){
        errors.score = "we need score";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckProfile(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    const profile = await ProfileService.FindOneById(req.body.idProfile);
    if (!profile){
        errors.idTeamScore = "we need idTeamScore";
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    } else {
        res.locals.profile = profile;
        next();
    }
}

export async function CheckTeamScore(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    const teamScore = await TeamService.FindOneById(req.body.idTeamScore);
    if (!teamScore){
        errors.teamLeader = "no team leader";
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    } else {
        res.locals.teamScore = teamScore;
        next();
    }
}

export async function CheckTeamLeader(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (res.locals.profile.team.teamLeader == null){
        errors.teamLeader = "no team leader";
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    } else {
        res.locals.teamLeader = await TeamLeaderService.FindOneById(res.locals.profile.team.teamLeader.id);
        if (res.locals.teamLeader.profile.id != res.locals.profile.id) {
            errors.teamLeader = "profile isn't team leader";
            res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
        } else {
            next();
        }
    }
}

export async function CheckMatchs(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (res.locals.profile.team.match.id != res.locals.teamScore.match.id){
        errors.teamLeader = "teams aren't in the same match";
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    } else {
        next();
    }
}