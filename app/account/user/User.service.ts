import { getCustomRepository } from "typeorm";
import { User } from "./User.model";
import { UserRepository } from "./User.repository";

export class UserService {
    public static FindByText(text: string): Promise<User[]> {
        return getCustomRepository(UserRepository).findByText(text);
    }

    public static BulkCreate(Users: User[]): Promise<User[]> {
        return getCustomRepository(UserRepository).bulkCreate(Users);
    }

    public static FindOneById(id: number): Promise<User> {
        return getCustomRepository(UserRepository).findOneById(id);
    }

    public static FindOneByEmail(email: string): Promise<User> {
        return getCustomRepository(UserRepository).findOneByEmail(email);
    }

    public static FindOneByUsername(username: string): Promise<User> {
        return getCustomRepository(UserRepository).findOneByUsername(username);
    }

    public static Find(): Promise<User[]> {
        return getCustomRepository(UserRepository).find();
    }

    public static Remove(user: User): Promise<User> {
        return getCustomRepository(UserRepository).remove(user);
    }

    public static RemoveById(id: number): Promise<User> {
        return getCustomRepository(UserRepository).removeById(id);
    }

    public static Save(user: User): Promise<User> {
        return getCustomRepository(UserRepository).save(user);
    }
}
