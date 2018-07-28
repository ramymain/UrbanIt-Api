import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../models/Profile.model";
import { Sport } from "../models/Sport.model";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    public find(): Promise<Profile[]> {
        return this.manager.find(Profile, {relations: ['user', "team", "sport"]});
    }

    public findByPlayer(idPlayer: number): Promise<Profile[]> {
        return this.manager.find(Profile, {where: {user: idPlayer}, relations: ['user', "team", "sport"]});
    }

    public findOneById(idPlayer: number, sport: Sport): Promise<Profile> {
        return this.manager.findOne(Profile, {where: {user: idPlayer, sport: sport}, relations: ['user', "team", "sport"]});
    }

    public async removeById(id: number): Promise<Profile> {
        const itemToRemove: Profile = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

}
