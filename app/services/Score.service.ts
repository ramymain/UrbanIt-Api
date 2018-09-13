import { getCustomRepository } from "typeorm";
import { Score } from "../models/Score.model";
import { ScoreRepository } from "../repository/Score.repository";

export class ScoreService {

    public static Save(score: Score): Promise<Score> {
        return getCustomRepository(ScoreRepository).save(score);
    }

    public static FindOneById(idScore: number): Promise<Score> {
        return getCustomRepository(ScoreRepository).findOneById(idScore);
    }
}
