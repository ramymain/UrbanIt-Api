import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../models/User.model"
import { Match } from "../models/Match.model"

@Entity("team")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @OneToMany(type => User, user => user.team)
    users: User[];

    @ManyToOne(type => Match, match => match.teams)
    match: Match;
}
