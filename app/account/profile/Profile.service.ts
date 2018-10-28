import { getCustomRepository } from "typeorm";
import { Profile } from "./Profile.model";
import { Sport } from "../sport/Sport.model";
import { ProfileRepository } from "./Profile.repository";

export class ProfileService {

    public static Find(): Promise<Profile[]> {
        return getCustomRepository(ProfileRepository).find();
    }

    public static FindByPlayer(idPlayer: number): Promise<Profile[]> {
        return getCustomRepository(ProfileRepository).findByPlayer(idPlayer);
    }

    public static Save(profile: Profile): Promise<Profile> {
        return getCustomRepository(ProfileRepository).save(profile);
    }

    public static FindOneById(idProfile: number): Promise<Profile> {
        return getCustomRepository(ProfileRepository).findOneById(idProfile);
    }

    public static FindOneByUserAndSport(idUser: number, sport: Sport): Promise<Profile> {
        return getCustomRepository(ProfileRepository).findOneByUserAndSport(idUser, sport);
    }

    public static RemoveById(id: number): Promise<Profile> {
        return getCustomRepository(ProfileRepository).removeById(id);
    }

    public static FindBest(sport: Sport, take: number, skip: number): Promise<Profile[]> {
        return getCustomRepository(ProfileRepository).findBest(sport, take, skip);
    }

    public static Count(sport: Sport): Promise<number> {
        return getCustomRepository(ProfileRepository).countPlayer(sport);
    }

    public static getPosition(profile: Profile): Promise<number> {
        return getCustomRepository(ProfileRepository).getPosition(profile);
    }
}
