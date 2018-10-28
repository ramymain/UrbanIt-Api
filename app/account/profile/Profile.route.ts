import * as express from "express";
import { ProfileController } from "./Profile.controller";
import { UserExist } from "../user/User.middleware";
import { CheckDelete, CheckJoin, CheckCreate, ProfileExist, ProfileShouldntExist } from "./Profile.middleware";
import { SportExist, OptionnalSportExist } from "../sport/Sport.middleware";

export const ProfileRoute: express.Router = express.Router()
    .get("/", ProfileController.All)
    .get("/byUser/:idUser", [ UserExist ], ProfileController.AllByPlayer)
    .get("/best/:sport/:take*?/:skip*?", [ SportExist ], ProfileController.Best)
    .get("/count/:sport", [ SportExist ], ProfileController.Count)
    .get("/:idProfile", [ ProfileExist ], ProfileController.Find)
    .get("/:idUser/:sport", [ UserExist, SportExist ], ProfileController.FindByUserAndSport)
    .put("/:idProfile", [ ProfileExist, OptionnalSportExist ], ProfileController.Update)
    .delete("/:idProfile", [ CheckDelete, ProfileExist ], ProfileController.Delete)
    .post("/", [ CheckCreate, SportExist, UserExist, ProfileShouldntExist ], ProfileController.Create)
    .post("/jointeam", [ CheckJoin, ProfileExist ], ProfileController.JoinTeam);
