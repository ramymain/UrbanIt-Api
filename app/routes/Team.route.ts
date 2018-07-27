import * as express from "express";
import { TeamController } from "../controllers/Team.Controller";

export const TeamRoute: express.Router = express.Router()
    .get("/", TeamController.All)
    .get("/:id", TeamController.Find)
    .post("/", TeamController.Create);
