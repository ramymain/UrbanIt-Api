import { getCustomRepository } from "typeorm";
import { User } from "../models/User.model";
import { UserRepository } from "../repository/User.repository";

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
