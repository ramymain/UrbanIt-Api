import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Team } from "../models/Team.model"

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public keypass: string;

    @Column("text")
    @IsEmail()
    public email: string;

    @Column("text")
    public urlPict: string;

    @Column("text")
    public description: string;

    @Column({
        type: "numeric",
        default: 1000
    })
    public ranking: number;

    @ManyToOne(type => Team, team => team.users)
    team: Team;
}
