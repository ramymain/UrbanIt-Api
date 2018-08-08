import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterUpdate } from "typeorm";
import { Profile } from "./Profile.model"
import { Match } from "./Match.model"
import { Sport } from "./Sport.model"
import { TeamController } from "../controllers/Team.Controller"
import * as express from "express";

@Entity("team")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public teamName: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;


    @ManyToOne(type => Sport, sport => sport.teams)
    sport: Sport;

    @Column()
    public isFill: boolean;

    @OneToMany(type => Profile, profile => profile.team)
    profiles: Profile[];

    @Column()
    profileCount: number;

    @ManyToOne(type => Match, match => match.teams)
    match: Match;
}
