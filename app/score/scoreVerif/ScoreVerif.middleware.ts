import * as express from "express";
import { ResultHelpers } from "../../helpers/Result.helpers"
import { ScoreVerifService } from "../scoreVerif/ScoreVerif.service"


export async function ScoreExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idMatch: number = req.params.idMatch != null ? req.params.idMatch : req.body.idMatch != null ? req.body.idMatch : res.status(400).json(ResultHelpers.createReturnJson(400, "error", { "idMatch": "we need idMatch" }));
    const scoreVerif = await ScoreVerifService.FindOneByMatchId(idMatch);
    !scoreVerif ? next() : res.status(400).json(ResultHelpers.createReturnJson(400, "error", { "scoreVerif": "score already set" }));
}