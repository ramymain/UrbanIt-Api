import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Team } from "../team/Team.model"
import { Sport } from "../../account/sport/Sport.model"
import { Score } from "../../score/score/Score.model"

@Entity("match")
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @ManyToOne(type => Sport, sport => sport.matchs)
    sport: Sport;

    @OneToMany(type => Team, team => team.match)
    teams: Team[];

    @Column({
        default: false
    })
    public isFill: boolean;

    @OneToMany(type => Score, score => score.match)
    scores: Score[];

    @Column({
        type: "numeric",
        default: 0
    })
    teamCount: number;
}
