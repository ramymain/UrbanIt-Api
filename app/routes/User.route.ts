import * as express from "express";
import { UserController } from "../controllers/User.controller";
import { UserExist, CheckCreate, CheckUpdate, CheckDelete } from "../middlewares/User.middleware"

export const UserRoute: express.Router = express.Router()
    .get("/", UserController.All)
    .get("/:idUser", [UserExist], UserController.Find)
    .post("/", [CheckCreate], UserController.Create)
    .put("/", [CheckUpdate, UserExist], UserController.Update)
    .delete("/", [CheckDelete, UserExist], UserController.Delete);
