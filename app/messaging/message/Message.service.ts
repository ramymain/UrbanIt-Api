import { getCustomRepository } from "typeorm";
import { Message } from "./Message.model";
import { MessageRepository } from "./Message.repository";

export class MessageService {
    public static Save(message: Message): Promise<Message> {
        return getCustomRepository(MessageRepository).save(message);
    }

    public static FindOneById(idMessage: number): Promise<Message> {
        return getCustomRepository(MessageRepository).findOneById(idMessage);
    }
}
