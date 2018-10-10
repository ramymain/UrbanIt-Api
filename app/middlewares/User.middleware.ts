import * as express from "express";
import { UserService } from "../services/User.service"
import { StringHelpers } from "../helpers/String.helpers"

export async function UserExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idUser: number = req.params.idUser != null ? req.params.idUser : req.body.idUser != null ? req.body.idUser : res.status(404).json({error: "we need idUser"});
    const user = await UserService.FindOneById(idUser);
    user ? next() : res.status(404).json({error: "user doesn't exist"});
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.username)){
        res.status(404).json({error: "we need username"});
    }
    if (StringHelpers.isNullOrWhitespace(req.body.keypass)){
        res.status(404).json({error: "we need keypass"});
    }
    if (StringHelpers.isNullOrWhitespace(req.body.email)){
        res.status(404).json({error: "we need email"});
    }
    if (StringHelpers.isNullOrWhitespace(req.body.description)){
        res.status(404).json({error: "we need description"});
    }
    if (StringHelpers.isNullOrWhitespace(req.body.firstName)){
        res.status(404).json({error: "we need firstName"});
    }
    if (StringHelpers.isNullOrWhitespace(req.body.lastName)){
        res.status(404).json({error: "we need lastName"});
    }
    else {
        next();
    }
}

export async function CheckUpdate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.idUser)){
        res.status(404).json({error: "we need idUser"});
    }
    else {
        next();
    }
}

export async function CheckDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (StringHelpers.isNullOrWhitespace(req.body.idUser)){
        res.status(404).json({error: "we need idUser"});
    }
    else {
        next();
    }
}