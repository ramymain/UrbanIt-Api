import * as express from "express";
import { SportController } from "./Sport.controller"

export const SportRoute: express.Router = express.Router()
    .get("/", SportController.All);
