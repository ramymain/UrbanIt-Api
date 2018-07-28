import * as express from "express";
import { TeamController } from "../controllers/Team.Controller";
import { TeamExist, CheckCreate } from "../middlewares/Team.middleware"
import { SportExist } from "../middlewares/Sport.middleware"

export const TeamRoute: express.Router = express.Router()
    .get("/", TeamController.All)
    .get("/:id", [TeamExist], TeamController.Find)
    .post("/", [CheckCreate, SportExist], TeamController.Create);
