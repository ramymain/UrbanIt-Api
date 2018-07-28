import { EntityRepository, Repository } from "typeorm";
import { Team } from "../models/Team.model";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {

    public find(): Promise<Team[]> {
        return this.manager.find(Team, {relations: ["profile", "match"]});
    }

    public findBySport(sport: string): Promise<Team[]> {
        return this.manager.find(Team, {where: {sport : sport}, relations: ["profile", "match"]});
    }

    public findBySportNotFill(sport: string): Promise<Team[]> {
        return this.manager.find(Team, {where: {sport : sport, isFill: false}, relations: ["profile", "match"]});
    }

    public findOneById(id: number): Promise<Team> {
        return this.manager.findOne(Team, {where: {id}, relations: ["profile", "match"]});
    }
}
