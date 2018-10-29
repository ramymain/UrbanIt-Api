import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
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
    public user: User;

    @ManyToMany(type => Team, team => team.profiles)
    @JoinTable()
    public teams: Team[];
    
    @OneToMany(type => Message, message => message.profile)
    public messages: Message[];

    @Column({
        type: "numeric",
        default: 0
    })
    public nbWin: number

    @Column({
        type: "numeric",
        default: 0
    })
    public nbDefeat: number

    @Column({
        type: "numeric",
        default: 0
    })
    public nbEquality: number
}
