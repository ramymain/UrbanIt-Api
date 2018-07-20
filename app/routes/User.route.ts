import * as express from "express";
import { UserController } from "../controllers/User.controller";

export const UserRoute: express.Router = express.Router()
    .get("/", UserController.All)
    .get("/:id", UserController.Find)
    .post("/", UserController.Create)
    .put("/", UserController.Update)
    .delete("/", UserController.Delete);
