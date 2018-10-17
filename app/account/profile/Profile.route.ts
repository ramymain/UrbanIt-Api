import * as express from "express";
import { ProfileController } from "./Profile.controller";
import { UserExist } from "../user/User.middleware";
import { CheckDelete, CheckJoin, CheckCreate, ProfileExist, ProfileShouldntExist } from "./Profile.middleware";
import { SportExist, OptionnalSportExist } from "../sport/Sport.middleware";
import { CheckEntry, CheckProfile, CheckTeamScore, CheckTeamLeader, CheckMatchs } from "../../score/score/Score.middleware";

export const ProfileRoute: express.Router = express.Router()
    .get("/", ProfileController.All)
    .get("/byUser/:idUser", [ UserExist ], ProfileController.AllByPlayer)
    .get("/:idProfile", [ ProfileExist ], ProfileController.Find)
    .get("/:id/:sport", [ UserExist, SportExist ], ProfileController.FindByUserAndSport)
    .put("/:idProfile", [ ProfileExist, OptionnalSportExist ], ProfileController.Update)
    .delete("/:idProfile", [ CheckDelete, ProfileExist ], ProfileController.Delete)
    .post("/", [ CheckCreate, SportExist, UserExist, ProfileShouldntExist ], ProfileController.Create)
    .post("/jointeam", [ CheckJoin, ProfileExist ], ProfileController.JoinTeam)
    .post("/scorematch", [ CheckEntry, CheckProfile, CheckTeamScore, CheckTeamLeader, CheckMatchs ], ProfileController.ScoreMatch);
