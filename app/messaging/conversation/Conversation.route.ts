import * as express from "express";
import { ConversationController } from "./Conversation.controller";
import { CheckCreateMatch, GetProfilesMatch } from "./Conversation.middleware";
import { MatchExist } from "../../tunnel/match/Match.middleware";

export const ConversationRoute: express.Router = express.Router()
    .post("/match/:idMatch", [ CheckCreateMatch, MatchExist, GetProfilesMatch ], ConversationController.CreateMatch);
