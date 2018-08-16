import { EntityRepository, Repository, LessThan } from "typeorm";
import { Team } from "../models/Team.model";
import { Sport } from "../models/Sport.model";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {

    public find(): Promise<Team[]> {
        return this.manager.find(Team, {relations: ["profiles", "match", "sport"]});
    }

    public findBySport(sport: Sport): Promise<Team[]> {
        return this.manager.find(Team, {where: {sport : sport}, relations: ["profiles", "match", "sport"]});
    }

    public findBySportNotFill(sport: Sport): Promise<Team[]> {
        return this.manager.find(Team, {where: {sport : sport, isFill: false}, relations: ["profiles", "match", "sport"]});
    }

    public findOneById(id: number): Promise<Team> {
        return this.manager.findOne(Team, {where: {id}, relations: ["profiles", "match", "sport"]});
    }

    public async removeById(id: number): Promise<Team> {
        const itemToRemove: Team = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }
}
