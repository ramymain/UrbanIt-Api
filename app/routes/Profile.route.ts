import * as express from "express";
import { ProfileController } from "../controllers/Profile.controller";
import { UserExist } from "../middlewares/User.middleware";
import { CheckJoin, CheckCreate, ProfileExist, ProfileShouldntExist } from "../middlewares/Profile.middleware";
import { SportExist } from "../middlewares/Sport.middleware";
import { CheckEntry, CheckProfile, CheckTeamScore, CheckTeamLeader, CheckMatchs } from "../middlewares/Score.middleware";

export const ProfileRoute: express.Router = express.Router()
    .get("/", ProfileController.All)
    .get("/:idUser", [ UserExist ], ProfileController.AllByPlayer)
    .get("/:idProfile", [ ProfileExist ], ProfileController.Find)
    .get("/:id/:sport", [ UserExist, SportExist ], ProfileController.FindByUserAndSport)
    .post("/", [ CheckCreate, SportExist, UserExist, ProfileShouldntExist ], ProfileController.Create)
    .post("/jointeam", [ CheckJoin, ProfileExist ], ProfileController.JoinTeam)
    .post("/scorematch", [ CheckEntry, CheckProfile, CheckTeamScore, CheckTeamLeader, CheckMatchs ], ProfileController.ScoreMatch);
