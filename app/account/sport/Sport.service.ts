import { getCustomRepository } from "typeorm";
import { Sport } from "./Sport.model";
import { SportRepository } from "./Sport.repository";

export class SportService {
    public static Find(): Promise<Sport[]> {
        return getCustomRepository(SportRepository).find();
    }

    public static FindBySport(sport: string): Promise<Sport> {
        return getCustomRepository(SportRepository).findBySport(sport);
    }
}
