import * as express from "express";
import { UserController } from "./User.controller";
import { UserExist, CheckCreate, CheckUpdate, CheckDelete, CheckLoginAvailable } from "./User.middleware"

export const UserRoute: express.Router = express.Router()
    .get("/", UserController.All)
    .get("/:idUser", [UserExist], UserController.Find)
    .post("/", [CheckCreate, CheckLoginAvailable], UserController.Create)
    .put("/", [CheckUpdate, UserExist, CheckLoginAvailable], UserController.Update)
    .delete("/", [CheckDelete, UserExist], UserController.Delete);
