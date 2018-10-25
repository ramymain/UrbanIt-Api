import * as express from "express";
import { MessageController } from "./Message.controller";
import { ConversationExist } from "../conversation/Conversation.middleware";
import { ProfileExist } from "../../account/profile/Profile.middleware";
import { CheckCreate, ProfileInConversation } from "./Message.middleware";

export const MessageRoute: express.Router = express.Router()
    .post("/:idConversation", [ CheckCreate, ConversationExist, ProfileExist, ProfileInConversation ], MessageController.Create);
