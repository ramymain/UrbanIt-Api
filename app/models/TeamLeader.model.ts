import { IsEmail, IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Team } from "./Team.model"
import { Profile } from "./Profile.model"

@Entity("teamleader")
export class TeamLeader extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Team, team => team.teamLeader)
    @JoinColumn()
    team: Team;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;
}
