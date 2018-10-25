import { getCustomRepository } from "typeorm";
import { Conversation } from "./Conversation.model";
import { ConversationRepository } from "./Conversation.repository";

export class ConversationService {
    public static Save(conversation: Conversation): Promise<Conversation> {
        return getCustomRepository(ConversationRepository).save(conversation);
    }

    public static FindOneById(idConversation: number): Promise<Conversation> {
        return getCustomRepository(ConversationRepository).findOneById(idConversation);
    }
}
