import { EntityRepository, Repository } from "typeorm";
import { Profile } from "../models/Profile.model";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    public find(): Promise<Profile[]> {
        return this.manager.find(Profile, {relations: ['user']});
    }

    public findByPlayer(idPlayer: number): Promise<Profile[]> {
        return this.manager.find(Profile, {where: {user: idPlayer}});
    }

    public findOneById(idPlayer: number, sport: string): Promise<Profile> {
        return this.manager.findOne(Profile, {where: {user: idPlayer, sport: sport}});
    }

    public async removeById(id: number): Promise<Profile> {
        const itemToRemove: Profile = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

}
