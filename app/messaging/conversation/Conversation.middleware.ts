import * as express from "express";
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"
import { Match } from "../../tunnel/match/Match.model";
import { Profile } from "../../account/profile/Profile.model";
import { ConversationService } from "./Conversation.service"


export async function ConversationExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idConversation: number = req.params.idConversation != null ? req.params.idConversation : req.body.idConversation != null ? req.body.idConversation : res.status(400).json(ResultHelpers.createReturnJson(400, "error", { "idConversation": "we need idConversation" }));
    const conversation = await ConversationService.FindOneById(idConversation);
    res.locals.conversation = conversation;
    conversation ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "conversation": "conversation doesn't exist" }));
}


export async function CheckCreateMatch(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idMatch)) {
        errors.username = "we need idMatch";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function GetProfilesMatch(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var match: Match = res.locals.match;
    var profiles: Profile[] = [];
    match.teams.forEach(team => {
        team.profiles.forEach(profile => {
            profiles.push(profile);
        })
    });
    res.locals.profiles = profiles;
    next();
}