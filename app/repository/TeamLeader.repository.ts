import { EntityRepository, Repository, LessThan } from "typeorm";
import { TeamLeader } from "../models/TeamLeader.model";

@EntityRepository(TeamLeader)
export class TeamLeaderRepository extends Repository<TeamLeader> {

}
