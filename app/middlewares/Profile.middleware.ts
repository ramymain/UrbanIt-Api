import * as express from "express";
import { ProfileService } from "../services/Profile.service"
import { TeamService } from "../services/Team.service"
import { StringHelpers } from "../helpers/String.helpers"

export async function ProfileExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id: number = req.params.id != null ? req.params.id : req.body.id != null ? req.body.id : res.status(404).json({error: "profile doesn't exist"});
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : res.status(404).json({error: "profile doesn't exist"});
    const profile = await ProfileService.FindOneById(id, sport);
    profile ? next() : res.status(404).json({error: "profile doesn't exist"});
}

export async function ProfileShouldntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id_user: number = req.body.id_user;
    const sport: string = req.body.sport;
    const profile = await ProfileService.FindOneById(id_user, sport);
    !profile ? next() : res.status(404).json({error: "profile already exist"});
}

export async function TeamExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id_team: number = req.params.id_team != null ? req.params.id_team : req.body.id_team != null ? req.body.id_team : res.status(404).json({error: "team doesn't exist"});
    const team = await TeamService.FindOneById(id_team);
    team ? next() : res.status(404).json({error: "team doesn't exist"});
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.id_user)){
        res.status(404).json({error: "we need id_user"});
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.sport)){
        res.status(404).json({error: "we need sport"});
    }
    // else if (StringHelpers.isNullOrWhitespace(req.body.size)){
    //     res.status(404).json({error: "we need size"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.weight)){
    //     res.status(404).json({error: "we need weight"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.numero)){
    //     res.status(404).json({error: "we need numero"});
    // }
    // else if (StringHelpers.isNullOrWhitespace(req.body.position)){
    //     res.status(404).json({error: "we need position"});
    // }
    else {
        next();
    }
}

export async function CheckJoin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.id_user)){
        res.status(404).json({error: "we need id_user"});
    }
    else if (StringHelpers.isNullOrWhitespace(req.body.sport)){
        res.status(404).json({error: "we need sport"});
    }
    else {
        next();
    }
}

export async function CheckDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.id)){
        res.status(404).json({error: "we need id"});
    }
    else {
        next();
    }
}