import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Message } from "../message/Message.model"
import { Profile } from "../../account/profile/Profile.model"

@Entity("conversation")
export class Conversation extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => Message, message => message.conversation)
    public messages: Message[];

    @ManyToMany(type => Profile)
    @JoinTable()
    public profiles: Profile[]
}
