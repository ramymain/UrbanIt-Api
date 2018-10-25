import * as express from "express";
import { ResultHelpers } from "../../helpers/Result.helpers"
import { Conversation } from "../conversation/Conversation.model";
import { Message } from "./Message.model";
import { Profile } from "../../account/profile/Profile.model";
import { MessageService } from "./Message.service";


export class MessageController {
    public static async Create(req: express.Request, res: express.Response){
        var conversation: Conversation = res.locals.conversation;
        var profile: Profile = res.locals.profile;
        var fieldMessage: string = req.body.message;
        var message: Message = new Message();
        message.message = fieldMessage;
        message.conversation = conversation;
        message.profile = profile;
        try {
            const Result = await MessageService.Save(message);
            res.status(201).json(ResultHelpers.createReturnJson(201, "success", Result));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }
}
