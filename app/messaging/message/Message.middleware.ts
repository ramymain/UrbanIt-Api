import * as express from "express";
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"
import { Match } from "../../tunnel/match/Match.model";
import { Profile } from "../../account/profile/Profile.model";
import { MessageService } from "./Message.service"
import { Conversation } from "../conversation/Conversation.model";


export async function MessageExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idMessage: number = req.params.idMessage != null ? req.params.idMessage : req.body.idMessage != null ? req.body.idMessage : res.status(400).json(ResultHelpers.createReturnJson(400, "error", { "idMessage": "we need idMessage" }));
    const message = await MessageService.FindOneById(idMessage);
    res.locals.message = message;
    message ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "message": "message doesn't exist" }));
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idConversation)) {
        errors.idConversation = "we need idConversation";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)) {
        errors.idProfile = "we need idProfile";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.message)) {
        errors.message = "we need message";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function ProfileInConversation(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var conversation: Conversation = res.locals.conversation;
    var profile: Profile = res.locals.profile;
    conversation.profiles.some(pro => pro.id == profile.id) ? next() : res.status(403).json(ResultHelpers.createReturnJson(403, "error", { "profile": "you're not in this conversation" }));
}

