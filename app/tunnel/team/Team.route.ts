import * as express from "express";
import { TeamController } from "./Team.Controller";
import { TeamExist, CheckCreate, CheckJoinMatch, CheckJoinTeam } from "./Team.middleware"
import { SportExist } from "../../account/sport/Sport.middleware"

export const TeamRoute: express.Router = express.Router()
    .get("/", TeamController.All)
    .get("/:idTeam", [TeamExist], TeamController.Find)
    .post("/", [CheckCreate, SportExist], TeamController.Create)
    .post("/jointeam", [ CheckJoinTeam, TeamExist ], TeamController.JoinTeam)
    .post("/joinmatch", [ CheckJoinMatch, TeamExist ], TeamController.JoinMatchReq);
