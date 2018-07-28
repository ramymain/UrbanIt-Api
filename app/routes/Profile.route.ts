import * as express from "express";
import { ProfileController } from "../controllers/Profile.controller";
import { UserExist } from "../middlewares/User.middleware";
import { ProfileExist, TeamExistAndNotGetProfile, ProfileShouldntExist } from "../middlewares/Profile.middleware";

export const ProfileRoute: express.Router = express.Router()
    .get("/", ProfileController.All)
    .get("/:id", [ UserExist ], ProfileController.AllByPlayer)
    .get("/:id/:sport", [ UserExist ], ProfileController.Find)
    .post("/", [ UserExist, ProfileShouldntExist ], ProfileController.Create)
    .post("/jointeam", [ ProfileExist ], ProfileController.JoinTeam);
