import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Team } from "./Team.model"
import { Sport } from "./Sport.model"
import { Score } from "./Score.model"

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

    @Column()
    public isFill: boolean;

    @OneToMany(type => Score, score => score.match)
    scores: Score[];

    @Column()
    teamCount: number;
}
