import * as express from "express";
import { TeamService } from "../tunnel/team/Team.service"
import { StringHelpers } from "../helpers/String.helpers"
import { ProfileService } from "../account/profile/Profile.service";
import { TeamLeaderService } from "../tunnel/teamLeader/TeamLeader.service";

export async function CheckEntry(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)){
        res.status(404).json({error: "we need idProfile"});
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.idTeamScore)){
        res.status(404).json({error: "we need idTeamScore"});
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.score)){
        res.status(404).json({error: "we need score"});
    }
    else {
        next();
    }
}

export async function CheckProfile(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const profile = await ProfileService.FindOneById(req.body.idProfile);
    if (!profile){
        res.status(404).json({error: "profile doesn't exist"});
    } else {
        res.locals.profile = profile;
        next();
    }
}

export async function CheckTeamScore(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const teamScore = await TeamService.FindOneById(req.body.idTeamScore);
    if (!teamScore){
        res.status(404).json({error: "no team leader"});
    } else {
        res.locals.teamScore = teamScore;
        next();
    }
}

export async function CheckTeamLeader(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (res.locals.profile.team.teamLeader == null){
        res.status(404).json({error: "no team leader"});
    } else {
        res.locals.teamLeader = await TeamLeaderService.FindOneById(res.locals.profile.team.teamLeader.id);
        if (res.locals.teamLeader.profile.id != res.locals.profile.id) {
            res.status(404).json({error: "profile isn't team leader"});
        } else {
            next();
        }
    }
}

export async function CheckMatchs(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (res.locals.profile.team.match.id != res.locals.teamScore.match.id){
        res.status(404).json({error: "teams aren't in the same match"});
    } else {
        next();
    }
}