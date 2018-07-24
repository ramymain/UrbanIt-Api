import { getCustomRepository } from "typeorm";
import { Profile } from "../models/Profile.model";
import { ProfileRepository } from "../repository/Profile.repository";

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

    public static FindOneById(idPlayer: number, sport: string): Promise<Profile> {
        return getCustomRepository(ProfileRepository).findOneById(idPlayer, sport);
    }

    public static RemoveById(id: number): Promise<Profile> {
        return getCustomRepository(ProfileRepository).removeById(id);
    }
}
