import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Match } from "../../tunnel/match/Match.model"

@Entity("scoreVerif")
export class ScoreVerif extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(type => Match)
    @JoinColumn()
    match: Match;

    @Column()
    public isValid: boolean;

    @Column()
    public isError: boolean;
}
