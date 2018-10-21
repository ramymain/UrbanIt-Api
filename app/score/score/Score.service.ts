import { getCustomRepository } from "typeorm";
import { Score } from "./Score.model";
import { ScoreRepository } from "./Score.repository";

export class ScoreService {
    public static Save(score: Score): Promise<Score> {
        return getCustomRepository(ScoreRepository).save(score);
    }

    public static FindOneById(idScore: number): Promise<Score> {
        return getCustomRepository(ScoreRepository).findOneById(idScore);
    }

    public static FindByMatch(idMatch: number): Promise<Score[]> {
        return getCustomRepository(ScoreRepository).findByMatch(idMatch);
    }

    public static FindByMatchAndTeam(idMatch: number, idTeam: number): Promise<Score[]> {
        return getCustomRepository(ScoreRepository).findByMatchAndTeam(idMatch, idTeam);
    }
}
