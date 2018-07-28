import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Team } from "./Team.model"
import { Profile } from "./Profile.model"
import { Match } from "./Match.model"

@Entity("sport")
export class Sport extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        unique: true
    })
    public sport: string;

    @Column()
    public nbPlayers: number;

    @Column()
    public nbTeam: number;

    @OneToMany(type => Profile, profile => profile.sport)
    profiles: Profile[];

    @OneToMany(type => Match, match => match.sport)
    matchs: Match[];

    @OneToMany(type => Team, team => team.sport)
    teams: Team[];
}
