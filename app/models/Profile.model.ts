import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../models/User.model"

@Entity("profile")
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public sport: string;

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

    @ManyToOne(type => User, user => user.profiles)
    user: User;
}
