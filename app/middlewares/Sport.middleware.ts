import * as express from "express";
import { SportService } from "../services/Sport.service"

export async function SportExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : res.status(404).json({error: "we need sport"});
    const sportModel = await SportService.FindBySport(sport);
    sportModel ? next() : res.status(404).json({error: "sport doesn't exist"});
}