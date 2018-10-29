import { EntityRepository, Repository, MoreThan } from "typeorm";
import { Profile } from "./Profile.model";
import { Sport } from "../sport/Sport.model";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    public find(): Promise<Profile[]> {
        return this.manager.find(Profile, {relations: ['user', "teams", "sport"]});
    }

    public findByPlayer(idPlayer: number): Promise<Profile[]> {
        return this.manager.find(Profile, {where: {user: idPlayer}, relations: ['user', "teams", "sport"]});
    }

    public findOneById(idProfile: number): Promise<Profile> {
        return this.manager.findOne(Profile, {where: {id: idProfile}, relations: ['user', "teams", "sport", "teams.teamLeader", "teams.match"]});
    }

    public findOneByUserAndSport(idUser: number, sport: Sport): Promise<Profile> {
        return this.manager.findOne(Profile, {where: {user: idUser, sport: sport}, relations: ['user', "teams", "sport"]});
    }

    public async removeById(id: number): Promise<Profile> {
        const itemToRemove: Profile = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

    public findBest(sport: Sport, take: number, skip: number): Promise<Profile[]> {
        return this.manager.find(Profile, {where: {sport: sport}, order: {ranking: "DESC"}, take: take, skip: skip});
    }

    public countPlayer(sport: Sport): Promise<number> {
        return this.manager.count(Profile, {where: {sport: sport}});
    }

    public getPosition(profile: Profile): Promise<number> {
        return this.manager.count(Profile, {where: {sport: profile.sport, ranking: MoreThan(profile.ranking) }, order: {ranking: "DESC"}});
    }
}
