import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Team } from "../models/Team.model"

@Entity("match")
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany(type => Team, team => team.match)
    teams: Team[];
}
