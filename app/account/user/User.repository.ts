import { EntityRepository, Repository } from "typeorm";
import { User } from "./User.model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public bulkCreate(Users: User[]): Promise<any> {
        return this.manager.createQueryBuilder().insert().into(User).values(Users).execute();
    }

    public async removeById(id: number): Promise<User> {
        const itemToRemove: User = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

    public findByText(text: string): Promise<User[]> {
        return this.manager.find(User, {where: {text}, relations: ["profiles", "profiles.teams", "profiles.sport", "profiles.teams.teamLeader", "profiles.teams.teamLeader.profile", "profiles.teams.profiles", "profiles.teams.match", "profiles.teams.match.teams", "profiles.teams.match.teams.profiles", "profiles.teams.match.teams.profiles.user", "profiles.teams.match.teams.teamLeader", "profiles.teams.match.teams.teamLeader.profile"]});
    }

    public findOneById(id: number): Promise<User> {
        return this.manager.findOne(User, {where: {id: id}, relations: ["profiles", "profiles.teams", "profiles.sport", "profiles.teams.teamLeader", "profiles.teams.teamLeader.profile", "profiles.teams.profiles", "profiles.teams.match", "profiles.teams.match.teams", "profiles.teams.match.teams.profiles", "profiles.teams.match.teams.profiles.user", "profiles.teams.match.teams.teamLeader", "profiles.teams.match.teams.teamLeader.profile"]});
    }

    public findOneByEmail(email: string): Promise<User> {
        return this.manager.findOne(User, {where: {email: email}, relations: ["profiles", "profiles.teams", "profiles.sport", "profiles.teams.teamLeader", "profiles.teams.teamLeader.profile", "profiles.teams.profiles", "profiles.teams.match", "profiles.teams.match.teams", "profiles.teams.match.teams.profiles", "profiles.teams.match.teams.profiles.user", "profiles.teams.match.teams.teamLeader", "profiles.teams.match.teams.teamLeader.profile"]});
    }

    public findOneByUsername(username: string): Promise<User> {
        return this.manager.findOne(User, {where: {username: username}, relations: ["profiles", "profiles.teams", "profiles.sport", "profiles.teams.teamLeader", "profiles.teams.teamLeader.profile", "profiles.teams.profiles", "profiles.teams.match", "profiles.teams.match.teams", "profiles.teams.match.teams.profiles", "profiles.teams.match.teams.profiles.user", "profiles.teams.match.teams.teamLeader", "profiles.teams.match.teams.teamLeader.profile"]});
    }

    public find(): Promise<User[]> {
        return this.manager.find(User, {relations: ["profiles", "profiles.teams", "profiles.sport", "profiles.teams.teamLeader", "profiles.teams.teamLeader.profile", "profiles.teams.profiles", "profiles.teams.match", "profiles.teams.match.teams", "profiles.teams.match.teams.profiles", "profiles.teams.match.teams.profiles.user", "profiles.teams.match.teams.teamLeader", "profiles.teams.match.teams.teamLeader.profile"]});
    }
}
