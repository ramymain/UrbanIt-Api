import * as express from "express";
import { User } from "./User.model";
import { UserService } from "./User.service";
import { validate } from "class-validator";
import { ResultHelpers } from '../../helpers/Result.helpers'
var passwordHash = require('password-hash');

export class UserController {

    public static async All(req: express.Request, res: express.Response) {
        const UserList = await UserService.Find();
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", UserList))
    }

    public static async Find(req: express.Request, res: express.Response) {
        const user = res.locals.user;
        return user ? res.status(200).json(ResultHelpers.createReturnJson(200, "success", user)) : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "user": "user doesn't exist" }));
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
                var errorsJson = ResultHelpers.createErrorsValidate(errors)
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", errorsJson ));
            }
            const Result = await UserService.Save(user);
            return res.status(201).json(ResultHelpers.createReturnJson(201, "success", Result));
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", {server: "internal server error"}));
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
                var errorsJson = ResultHelpers.createErrorsValidate(errors)
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", errorsJson ));
            }
            const Result = await UserService.Save(userUpdate);
            return Result ? res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result)) : res.status(404).send(ResultHelpers.createReturnJson(404, "error", { "user": "user doesn't exist" }));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }

    }

    public static async Delete(req: express.Request, res: express.Response) {
        const idUser: number = req.params.idUser;
        try {
            await UserService.RemoveById(idUser);
            return res.status(204).json(ResultHelpers.createReturnJson(204, "success", { user: "correctly removed" }));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }

}
