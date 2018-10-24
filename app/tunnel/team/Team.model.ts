import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Profile } from "../../account/profile/Profile.model"
import { Match } from "../match/Match.model"
import { Sport } from "../../account/sport/Sport.model"
import { TeamLeader } from "../teamLeader/TeamLeader.model"
import { Score } from "../../score/score/Score.model";
var generate = require('project-name-generator');

@Entity("team")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        default: generate({ words: 3 }).dashed
    })
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

    @OneToMany(type => Profile, profile => profile.team, {
        cascade: true
    })
    profiles: Profile[];

    @Column()
    profileCount: number;

    @ManyToOne(type => Match, match => match.teams)
    match: Match;

    @OneToOne(type => TeamLeader, teamLeader => teamLeader.team)
    teamLeader: TeamLeader;

    @OneToMany(type => Score, score => score.team)
    scores: Score[];
}
