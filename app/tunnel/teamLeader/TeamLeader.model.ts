import { IsEmail, IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Team } from "../team/Team.model"
import { Profile } from "../../account/profile/Profile.model"

@Entity("teamleader")
export class TeamLeader extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Team, team => team.teamLeader)
    @JoinColumn()
    team: Team;

    @ManyToOne(type => Profile)
    profile: Profile;
}
