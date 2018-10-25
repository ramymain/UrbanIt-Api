import { EntityRepository, Repository, LessThan } from "typeorm";
import { Conversation } from "./Conversation.model";

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<Conversation> {
    public findOneById(idConversation: number): Promise<Conversation> {
        return this.manager.findOne(Conversation, {where: {id: idConversation}, relations: ["messages", "profiles"]});
    }
}
