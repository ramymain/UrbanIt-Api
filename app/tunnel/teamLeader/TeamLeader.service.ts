import { getCustomRepository } from "typeorm";
import { TeamLeader } from "./TeamLeader.model";
import { Sport } from "../../account/sport/Sport.model";
import { TeamLeaderRepository } from "./TeamLeader.repository";

export class TeamLeaderService {

    public static Save(TeamLeader: TeamLeader): Promise<TeamLeader> {
        return getCustomRepository(TeamLeaderRepository).save(TeamLeader);
    }

    public static FindOneById(idTeamLeader: number): Promise<TeamLeader> {
        return getCustomRepository(TeamLeaderRepository).findOneById(idTeamLeader);
    }
}
