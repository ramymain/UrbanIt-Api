import * as express from "express";
import { ScoreController } from "./Score.controller"
import { CheckEntry, CheckJson, CheckTeamInMatchAndTeamLeader } from "./Score.middleware"
import { MatchExist } from "../../tunnel/match/Match.middleware"

export const ScoreRoute: express.Router = express.Router()
    .post("/:idMatch", [CheckEntry, CheckJson], ScoreController.Score);
