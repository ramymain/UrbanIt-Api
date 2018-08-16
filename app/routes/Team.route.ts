import * as express from "express";
import { TeamController } from "../controllers/Team.Controller";
import { TeamExist, CheckCreate, CheckJoinMatch, CheckJoinTeam } from "../middlewares/Team.middleware"
import { SportExist } from "../middlewares/Sport.middleware"
import { UserExist } from "../middlewares/User.middleware";

export const TeamRoute: express.Router = express.Router()
    .get("/", TeamController.All)
    .get("/:id", [TeamExist], TeamController.Find)
    .post("/", [CheckCreate, SportExist], TeamController.Create)
    .post("/jointeam", [ CheckJoinTeam, TeamExist ], TeamController.JoinTeam)
    .post("/joinmatch", [ CheckJoinMatch, TeamExist ], TeamController.JoinMatchReq);
