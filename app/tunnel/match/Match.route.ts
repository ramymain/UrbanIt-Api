import * as express from "express";
import { MatchController } from "../match/Match.controller";
import { SportExist } from "../../account/sport/Sport.middleware";

export const MatchRoute: express.Router = express.Router()
    .get("/inProgress/:sport", [ SportExist ], MatchController.InProgress)
    .get("/", MatchController.All);
