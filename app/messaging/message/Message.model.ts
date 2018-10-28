import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Conversation } from "../conversation/Conversation.model"
import { Profile } from "../../account/profile/Profile.model";

@Entity("message")
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Conversation, conversation => conversation.messages)
    public conversation: Conversation;

    @Column()
    public message: string;

    @ManyToOne(type => Profile, profile => profile.messages)
    public profile: Profile;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;
}
