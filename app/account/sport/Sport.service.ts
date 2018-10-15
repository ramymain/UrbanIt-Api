import { getCustomRepository } from "typeorm";
import { Sport } from "./Sport.model";
import { SportRepository } from "./Sport.repository";

export class SportService {

    public static FindBySport(sport: string): Promise<Sport> {
        return getCustomRepository(SportRepository).findBySport(sport);
    }
}
