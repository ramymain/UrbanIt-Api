import { getCustomRepository } from "typeorm";
import { Sport } from "../../account/sport/Sport.model";
import { Match } from "./Match.model";
import { MatchRepository } from "./Match.repository";

export class MatchService {
    public static FindBySportNotFill(sport: Sport): Promise<Match[]> {
        return getCustomRepository(MatchRepository).findBySportNotFill(sport);
    }

    public static Save(match: Match): Promise<Match> {
        return getCustomRepository(MatchRepository).save(match);
    }

    public static FindOneById(idMatch: number): Promise<Match> {
        return getCustomRepository(MatchRepository).findOneById(idMatch);
    }
}
