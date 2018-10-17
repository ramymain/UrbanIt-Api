import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "../../tunnel/team/Team.model"
import { Match } from "../../tunnel/match/Match.model"

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
