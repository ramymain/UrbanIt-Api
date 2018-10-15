import * as express from "express";
import { UserController } from "./User.controller";
import { UserExist, CheckCreate, CheckUpdate, CheckDelete } from "./User.middleware"

export const UserRoute: express.Router = express.Router()
    .get("/", UserController.All)
    .get("/:idUser", [UserExist], UserController.Find)
    .post("/", [CheckCreate], UserController.Create)
    .put("/", [CheckUpdate, UserExist], UserController.Update)
    .delete("/", [CheckDelete, UserExist], UserController.Delete);
