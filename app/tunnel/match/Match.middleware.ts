import * as express from "express";
import { ResultHelpers } from "../../helpers/Result.helpers"
import { MatchService } from "./Match.service"

export async function MatchExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idMatch: number = req.params.idMatch != null ? req.params.idMatch : req.body.idMatch != null ? req.body.idMatch : res.status(400).json(ResultHelpers.createReturnJson(400, "error", { "idMatch": "we need idMatch" }));
    const match = await MatchService.FindOneById(idMatch);
    res.locals.match = match;
    match ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "match": "match doesn't exist" }));
}