import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.model"
import { Team } from "./Team.model"
import { Sport } from "./Sport.model"

@Entity("profile")
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Sport, sport => sport.profiles)
    sport: Sport;

    @Column({
        type: "numeric"
    })
    public size: number;


    @Column({
        type: "numeric"
    })
    public weight: number;

    @Column()
    public numero: number;

    @Column()
    public position: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @ManyToOne(type => User, user => user.profiles)
    user: User;

    @ManyToOne(type => Team, team => team.match)
    team: Team;
}
