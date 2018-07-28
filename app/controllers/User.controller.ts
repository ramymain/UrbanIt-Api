import * as express from "express";
import { User } from "../models/User.model";
import { UserService } from "../services/User.service";
import { url } from "inspector";

export class UserController {

    public static async All(req: express.Request, res: express.Response) {
        const UserList = await UserService.Find();
        return res.status(200).json(UserList)
    }

    public static async Find(req: express.Request, res: express.Response) {
        const idUser: number = req.params.idUser;
        const user = await UserService.FindOneById(idUser);
        return user ? res.status(200).json(user) : res.status(404).json({message: "user not found"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const keypass: string = req.body.keypass;
        const email: string = req.body.email;
        const urlPict: string = req.body.urlPict;
        const description: string = req.body.description;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const user = new User();
        user.username = username;
        user.keypass = keypass;
        user.email = email;
        user.urlPict = urlPict;
        user.description = description;
        user.firstName = firstName;
        user.lastName = lastName;

        try {
            const Result = await UserService.Save(user);
            return res.status(200).json(Result);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async Update(req: express.Request, res: express.Response) {

        const idUser: number = req.body.idUser;
        const username: string = req.body.username;
        const keypass: string = req.body.keypass;
        const email: string = req.body.email;
        const urlPict: string = req.body.urlPict;
        const description: string = req.body.description;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;

        const user = await UserService.FindOneById(idUser);
        const userUpdate = new User();
        userUpdate.id = user.id;
        userUpdate.username = (username ? username : user.username);
        userUpdate.keypass = (keypass ? keypass : user.keypass);
        userUpdate.email = (email ? email : user.email);
        userUpdate.urlPict = (urlPict ? urlPict : user.urlPict);
        userUpdate.description = (description ? description : user.description);
        userUpdate.firstName = (firstName ? firstName : user.firstName);;
        userUpdate.lastName = (lastName ? lastName : user.lastName);;

        try {
            const Result = await UserService.Save(userUpdate);
            return Result ? res.status(200).json(Result) : res.status(404).send({message: "user not found"});
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
