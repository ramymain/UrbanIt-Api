import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Team } from "../../tunnel/team/Team.model"
import { Match } from "../../tunnel/match/Match.model"
import { Profile } from "../../account/profile/Profile.model";

@Entity("score")
export class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Team, team => team.scores)
    team: Team;

    @ManyToMany(type => Profile)
    @JoinTable()
    profile: Profile[];

    @ManyToOne(type => Match, match => match.scores)
    match: Match;

    @Column({
        type: "numeric"
    })
    public scored: number;
}
