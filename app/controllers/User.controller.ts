import * as express from "express";
import { User } from "../models/User.model";
import { UserService } from "../services/User.service";
import { url } from "inspector";

export class UserController {

    public static async All(req: express.Request, res: express.Response) {
        const UserList = await UserService.Find();
        return res.send(UserList);
    }

    public static async Find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const user = await UserService.FindOneById(id);
        return user ? res.status(200).send(user) : res.status(404).send({text: "NOT FOUND"});
    }

    public static async Create(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const keypass: string = req.body.keypass;
        const email: string = req.body.email;
        const urlPict: string = req.body.urlPict;
        const description: string = req.body.description;
        const note: number = req.body.note;
        const user = new User();
        user.username = username;
        user.keypass = keypass;
        user.email = email;
        user.urlPict = urlPict;
        user.description = description;
        user.note = note;

        try {
            const Result = await UserService.Save(user);
            return res.status(200).send(Result);
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

    public static async Update(req: express.Request, res: express.Response) {

        const id: number = req.body.id;
        const username: string = req.body.username;
        const keypass: string = req.body.keypass;
        const email: string = req.body.email;
        const urlPict: string = req.body.urlPict;
        const description: string = req.body.description;
        const note: number = req.body.note;

        const user = await UserService.FindOneById(req.body.id);
        const userUpdate = new User();
        userUpdate.id = user.id;
        userUpdate.username = (username ? username : user.username);
        userUpdate.keypass = (keypass ? keypass : user.keypass);
        userUpdate.email = (email ? email : user.email);
        userUpdate.urlPict = (urlPict ? urlPict : user.urlPict);
        userUpdate.description = (description ? description : user.description);
        userUpdate.note = (note ? note : user.note);

        try {
            const Result = await UserService.Save(userUpdate);
            return Result ? res.status(200).send() : res.status(404).send({text: "NOT FOUND"});
        } catch (ex) {
            console.log(ex);
            return res.status(404).send({text: "ERROR"});
        }

    }

    public static async Delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;

        try {
            await UserService.RemoveById(id);
            return res.status(204).send();
        } catch (ex) {
            return res.status(404).send({text: "ERROR"});
        }
    }

}
