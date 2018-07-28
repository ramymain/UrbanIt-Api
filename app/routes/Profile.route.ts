import * as express from "express";
import { ProfileController } from "../controllers/Profile.controller";
import { UserExist } from "../middlewares/User.middleware";
import { CheckJoin, CheckCreate, ProfileExist, ProfileShouldntExist } from "../middlewares/Profile.middleware";

export const ProfileRoute: express.Router = express.Router()
    .get("/", ProfileController.All)
    .get("/:idUser", [ UserExist ], ProfileController.AllByPlayer)
    .get("/:idUser/:sport", [ UserExist ], ProfileController.Find)
    .post("/", [ CheckCreate, UserExist, ProfileShouldntExist ], ProfileController.Create)
    .post("/jointeam", [ CheckJoin, ProfileExist ], ProfileController.JoinTeam);
