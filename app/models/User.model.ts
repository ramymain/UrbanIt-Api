import { IsEmail, IsDefined } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Profile } from "./Profile.model"

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsDefined()
    public username: string;

    @Column()
    @IsDefined()
    public firstName: string;

    @Column()
    @IsDefined()
    public lastName: string;

    @Column()
    @IsDefined()
    public keypass: string;

    @Column("text")
    @IsEmail()
    @IsDefined()
    public email: string;

    @Column("text")
    @IsDefined()
    public description: string;

    @OneToMany(type => Profile, profile => profile.user)
    profiles: Profile[];
}
