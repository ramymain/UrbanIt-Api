import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterUpdate } from "typeorm";
import { Profile } from "./Profile.model"
import { Match } from "./Match.model"

@Entity("team")
export class Team extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public teamName: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;


    @Column()
    public sport: string;

    @Column()
    public isFill: boolean;

    @OneToMany(type => Profile, profile => profile.team)
    profile: Profile[];

    @ManyToOne(type => Match, match => match.teams)
    match: Match;

    @AfterUpdate()
    updateCounters() {
        console.log("after update");
    }
}
