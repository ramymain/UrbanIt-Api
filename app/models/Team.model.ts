import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Profile } from "../models/Profile.model"
import { Match } from "../models/Match.model"

@Entity("team")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public teamname: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @OneToMany(type => Profile, profile => profile.team)
    profile: Profile[];

    @ManyToOne(type => Match, match => match.teams)
    match: Match;
}
