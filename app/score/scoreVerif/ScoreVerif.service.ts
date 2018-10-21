import { getCustomRepository } from "typeorm";
import { ScoreVerif } from "./ScoreVerif.model";
import { ScoreVerifRepository } from "./ScoreVerif.repository";

export class ScoreVerifService {

    public static Save(score: ScoreVerif): Promise<ScoreVerif> {
        return getCustomRepository(ScoreVerifRepository).save(score);
    }

    public static FindOneById(idScore: number): Promise<ScoreVerif> {
        return getCustomRepository(ScoreVerifRepository).findOneById(idScore);
    }

    public static FindOneByMatchId(idMatch: number): Promise<ScoreVerif> {
        return getCustomRepository(ScoreVerifRepository).findOneByMatchId(idMatch);
    }
}
