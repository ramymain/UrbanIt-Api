import * as express from "express";
import { SportService } from "./Sport.service"
import { ResultHelpers } from "../../helpers/Result.helpers";

export async function SportExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : res.status(404).json({error: "we need sport"});
    const sportModel = await SportService.FindBySport(sport);
    res.locals.sportModel = sportModel;
    sportModel ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { sport: "sport doesn't exist" }));
}

export async function OptionnalSportExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const sport: string = req.params.sport != null ? req.params.sport : req.body.sport != null ? req.body.sport : "";
    if (sport){
        console.log(sport);
        const sportModel = await SportService.FindBySport(sport);
        console.log(sportModel)
        res.locals.sportModel = sportModel;
        sportModel ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { sport: "sport doesn't exist" }));
    } else {
        next();
    }
}