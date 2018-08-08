import { getCustomRepository } from "typeorm";
import { Sport } from "../models/Sport.model";
import { Match } from "../models/Match.model";
import { MatchRepository } from "../repository/Match.repository";

export class MatchService {
    public static FindBySportNotFill(sport: Sport): Promise<Match[]> {
        return getCustomRepository(MatchRepository).findBySportNotFill(sport);
    }

    public static Save(match: Match): Promise<Match> {
        return getCustomRepository(MatchRepository).save(match);
    }
}
