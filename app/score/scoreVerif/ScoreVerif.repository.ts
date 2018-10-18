import { EntityRepository, Repository, LessThan } from "typeorm";
import { ScoreVerif } from "./ScoreVerif.model";

@EntityRepository(ScoreVerif)
export class ScoreVerifRepository extends Repository<ScoreVerif> {
    public findOneById(idScoreVerif: number): Promise<ScoreVerif> {
        return this.manager.findOne(ScoreVerif, {where: {id: idScoreVerif}, relations: ["match"]});
    }

    public findOneByMatchId(idMatch: number): Promise<ScoreVerif> {
        return this.manager.findOne(ScoreVerif, {where: {match: idMatch}, relations: ["match"]});
    }
}
