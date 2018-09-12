import { getCustomRepository } from "typeorm";
import { TeamLeader } from "../models/TeamLeader.model";
import { Sport } from "../models/Sport.model";
import { TeamLeaderRepository } from "../repository/TeamLeader.repository";

export class TeamLeaderService {

    public static Save(TeamLeader: TeamLeader): Promise<TeamLeader> {
        return getCustomRepository(TeamLeaderRepository).save(TeamLeader);
    }
}
