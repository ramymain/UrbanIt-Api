import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Profile } from "./Profile.model"

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

    @OneToMany(type => Profile, profile => profile.user)
    profiles: Profile[];
}
