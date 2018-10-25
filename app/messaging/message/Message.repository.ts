import { EntityRepository, Repository, LessThan } from "typeorm";
import { Message } from "./Message.model";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    public findOneById(idMessage: number): Promise<Message> {
        return this.manager.findOne(Message, {where: {id: idMessage}, relations: ["profile"]});
    }
}
