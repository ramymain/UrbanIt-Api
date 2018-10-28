import { EntityRepository, Repository, LessThan } from "typeorm";
import { Match } from "./Match.model";
import { Sport } from "../../account/sport/Sport.model";

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {
    public find(): Promise<Match[]> {
        return this.manager.find(Match);
    }

    public findBySportNotFill(sport: Sport): Promise<Match[]> {
        return this.manager.find(Match, {where: {sport : sport, isFill: false}, relations: ["teams", "teams.scores", "teams.scores.team", "teams.profiles", "sport", "teams.teamLeader", "teams.teamLeader.profile", "scores", "scoreVerif"]});
    }

    public findOneById(idMatch: number): Promise<Match> {
        return this.manager.findOne(Match, {where: {id: idMatch}, relations: ["teams", "teams.scores", "teams.scores.team", "teams.profiles", "sport", "teams.teamLeader", "teams.teamLeader.profile", "scores", "scoreVerif"]});
    }

    public countMatchInProgress(sport: Sport): Promise<number> {
        return this.manager.count(Match, {where: {sport: sport, scoreVerif: null}});
    }
}
