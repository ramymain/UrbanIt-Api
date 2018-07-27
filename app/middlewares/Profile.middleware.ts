import * as express from "express";
import { ProfileService } from "../services/Profile.service"
import { TeamService } from "../services/Team.service"

export async function ProfileExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id: number = req.params.id != null ? req.params.id : req.body.id != null ? req.body.id : res.status(404).json({error: "profile doesn't exist"});
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : res.status(404).json({error: "profile doesn't exist"});
    const profile = await ProfileService.FindOneById(id, sport);
    profile ? next() : res.status(404).json({error: "profile doesn't exist"});
}

export async function ProfileShouldntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id: number = req.params.id != null ? req.params.id : req.body.id != null ? req.body.id : res.status(404).json({error: "profile doesn't exist"});
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : res.status(404).json({error: "profile doesn't exist"});
    const profile = await ProfileService.FindOneById(id, sport);
    !profile ? next() : res.status(404).json({error: "profile already exist"});
}

export async function TeamExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id_team: number = req.params.id_team != null ? req.params.id_team : req.body.id_team != null ? req.body.id_team : res.status(404).json({error: "team doesn't exist"});
    const team = await TeamService.FindOneById(id_team);
    team ? next() : res.status(404).json({error: "team doesn't exist"});
}

export async function TeamExistAndNotGetProfile(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id_team: number = req.params.id_team != null ? req.params.id_team : req.body.id_team != null ? req.body.id_team : res.status(404).json({error: "team doesn't exist"});
    const team = await TeamService.FindOneById(id_team);
    if (team){
        const id: number = req.body.id;
        const sport: string = req.body.sport;
        const profileBdd = await ProfileService.FindOneById(id, sport);
        const profile = team.profile.find(function(element) {
            return element.id == profileBdd.id && element.sport == profileBdd.sport;
        });
        !profile ? next() : res.status(404).json({error: "profile already exist"});
    }
    else {
        res.status(404).json({error: "team doesn't exist"});
    }
}