import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Team } from "./Team.model"
import { Sport } from "./Sport.model"

@Entity("match")
export class Match extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Sport, sport => sport.matchs)
    sport: Sport;

    @Column()
    public nbMaxPlayers: number;

    @OneToMany(type => Team, team => team.match)
    teams: Team[];
}
