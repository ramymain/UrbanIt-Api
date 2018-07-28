import { getCustomRepository } from "typeorm";
import { Team } from "../models/Team.model";
import { Sport } from "../models/Sport.model";
import { TeamRepository } from "../repository/Team.repository";

export class TeamService {

    public static FindOneById(id: number): Promise<Team> {
        return getCustomRepository(TeamRepository).findOneById(id);
    }

    public static Save(team: Team): Promise<Team> {
        return getCustomRepository(TeamRepository).save(team);
    }

    public static Find(): Promise<Team[]> {
        return getCustomRepository(TeamRepository).find();
    }

    public static FindBySport(sport: Sport): Promise<Team[]> {
        return getCustomRepository(TeamRepository).findBySport(sport);
    }

    public static FindBySportNotFill(sport: Sport): Promise<Team[]> {
        return getCustomRepository(TeamRepository).findBySportNotFill(sport);
    }
}
