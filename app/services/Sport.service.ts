import { getCustomRepository } from "typeorm";
import { Sport } from "../models/Sport.model";
import { SportRepository } from "../repository/Sport.repository";

export class SportService {

    public static FindBySport(sport: string): Promise<Sport> {
        return getCustomRepository(SportRepository).findBySport(sport);
    }
}
