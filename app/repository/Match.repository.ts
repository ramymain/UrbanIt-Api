import { EntityRepository, Repository, LessThan } from "typeorm";
import { Match } from "../models/Match.model";
import { Sport } from "../models/Sport.model";

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    public findBySportNotFill(sport: Sport): Promise<Match[]> {
        return this.manager.find(Match, {where: {sport : sport, isFill: false}, relations: ["teams", "sport"]});
    }
}
