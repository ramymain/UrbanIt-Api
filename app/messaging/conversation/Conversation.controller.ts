import * as express from "express";
import { ResultHelpers } from "../../helpers/Result.helpers"
import { Profile } from "../../account/profile/Profile.model"
import { Conversation } from "./Conversation.model";
import { Match } from "../../tunnel/match/Match.model";
import { ConversationService } from "./Conversation.service";
import { Message } from "../message/Message.model";


export class ConversationController {
    public static async CreateConversation(profiles: Profile[]): Promise<Conversation> {
        var conversation: Conversation = new Conversation();
        conversation.profiles = [];
        profiles.forEach(profile => {
            conversation.profiles.push(profile);
        });
        return conversation;
    }

    public static async CreateMatch(req: express.Request, res: express.Response){
        var profiles: Profile[] = res.locals.profiles;
        var conversation: Conversation = await ConversationController.CreateConversation(profiles);
        conversation.messages = []
        try {
            console.log(conversation);
            const Result = await ConversationService.Save(conversation);
            return res.status(201).json(ResultHelpers.createReturnJson(201, "success", Result));
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }
}
