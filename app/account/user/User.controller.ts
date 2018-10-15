import * as express from "express";
import { User } from "./User.model";
import { UserService } from "./User.service";
import { validate } from "class-validator";
import { url } from "inspector";
var passwordHash = require('password-hash');

export class UserController {

    public static async All(req: express.Request, res: express.Response) {
        const UserList = await UserService.Find();
        return res.status(200).json(UserList)
    }

    public static async Find(req: express.Request, res: express.Response) {
        const user = res.locals.user;
        return user ? res.status(200).json(user) : res.status(404).json({message: "user not found"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const email: string = req.body.email;
        const description: string = req.body.description;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const user = new User();
        user.username = username;
        user.password = passwordHash.generate(password);
        user.email = email;
        user.description = description;
        user.firstName = firstName;
        user.lastName = lastName;

        try {
            const errors = await validate(user);
            if (errors && errors.length > 0){
                return res.status(404).json({error: errors});
            }
            const Result = await UserService.Save(user);
            return res.status(201).json(Result);
        } catch (ex) {
            console.log(ex);
            return res.status(404).json({error: "server error"});
        }
    }

    public static async Update(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const email: string = req.body.email;
        const description: string = req.body.description;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;

        const user = res.locals.user;
        const userUpdate = new User();
        userUpdate.id = user.id;
        userUpdate.username = (username ? username : user.username);
        userUpdate.password = (password ? passwordHash.generate(password) : user.password);
        userUpdate.email = (email ? email : user.email);
        userUpdate.description = (description ? description : user.description);
        userUpdate.firstName = (firstName ? firstName : user.firstName);;
        userUpdate.lastName = (lastName ? lastName : user.lastName);;

        try {
            const errors = await validate(userUpdate);
            if (errors && errors.length > 0){
                return res.status(404).json({error: errors});
            }
            const Result = await UserService.Save(userUpdate);
            return Result ? res.status(201).json(Result) : res.status(404).send({message: "user not found"});
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }

    }

    public static async Delete(req: express.Request, res: express.Response) {
        const idUser: number = req.body.idUser;
        try {
            await UserService.RemoveById(idUser);
            return res.status(204).json({message: "correctly removed"});
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

}
