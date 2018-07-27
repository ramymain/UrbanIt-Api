import * as express from "express";
import { MatchController } from "../controllers/Match.controller";

export const MatchRoute: express.Router = express.Router()
    .get("/", MatchController.All)
