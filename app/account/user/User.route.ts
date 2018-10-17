import * as express from "express";
import { UserController } from "./User.controller";
import { UserExist, UserExistEmail, CheckCreate, CheckUpdate, CheckSignIn, CheckDelete, CheckLoginAvailable } from "./User.middleware"

export const UserRoute: express.Router = express.Router()
    .get("/", UserController.All)
    .get("/:idUser", [UserExist], UserController.Find)
    .post("/signIn", [CheckSignIn, UserExistEmail], UserController.SignIn)
    .post("/", [CheckCreate, CheckLoginAvailable], UserController.Create)
    .put("/:idUser", [CheckUpdate, UserExist, CheckLoginAvailable], UserController.Update)
    .delete("/:idUser", [CheckDelete, UserExist], UserController.Delete);
