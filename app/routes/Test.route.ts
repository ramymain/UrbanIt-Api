import * as express from "express";
import { TestController } from "../controllers/Test.controller";

export const TestRoute: express.Router = express.Router()
    .post("/getTeamLeader", TestController.GetTeamLeader)
