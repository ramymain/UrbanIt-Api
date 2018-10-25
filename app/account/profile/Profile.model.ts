import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user/User.model"
import { Team } from "../../tunnel/team/Team.model"
import { Sport } from "../sport/Sport.model"
import { IsDefined } from "class-validator";
import { Message } from "../../messaging/message/Message.model";

@Entity("profile")
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Sport, sport => sport.profiles)
    sport: Sport;

    @IsDefined()
    @Column({
        type: "numeric"
    })
    public size: number;


    @IsDefined()
    @Column({
        type: "numeric"
    })
    public weight: number;

    @IsDefined()
    @Column()
    public numero: number;

    @IsDefined()
    @Column()
    public position: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @ManyToOne(type => User, user => user.profiles)
    user: User;

    @ManyToOne(type => Team, team => team.match)
    team: Team;
    
    @OneToMany(type => Message, message => message.profile)
    messages: Message[];
}
