import { EntityRepository, Repository, LessThan } from "typeorm";
import { TeamLeader } from "../models/TeamLeader.model";

@EntityRepository(TeamLeader)
export class TeamLeaderRepository extends Repository<TeamLeader> {
    public findOneById(idTeamLeader: number): Promise<TeamLeader> {
        return this.manager.findOne(TeamLeader, {where: {id: idTeamLeader}, relations: ["profile"]});
    }
}
