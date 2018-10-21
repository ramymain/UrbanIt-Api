import * as express from "express";
import { ScoreController } from "./Score.controller"
import { CheckEntry, CheckJson, CheckTeamInMatchAndTeamLeader } from "./Score.middleware"
import { ScoreExist } from "../scoreVerif/ScoreVerif.middleware"
import { MatchExist } from "../../tunnel/match/Match.middleware"
import { ProfileExist } from "../../account/profile/Profile.middleware"

export const ScoreRoute: express.Router = express.Router()
    .post("/:idMatch", [CheckEntry, CheckJson, ProfileExist, MatchExist, ScoreExist, CheckTeamInMatchAndTeamLeader], ScoreController.Score);
