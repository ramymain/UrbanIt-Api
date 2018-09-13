import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team.model"
import { Match } from "./Match.model"

@Entity("score")
export class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(type => Team, team => team.scores)
    team: Team;

    @ManyToOne(type => Match, match => match.scores)
    match: Match;

    @Column({
        type: "numeric"
    })
    public scored: number;
}
