import * as express from "express";
import { UserService } from "./User.service"
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"

export async function UserExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idUser: number = req.params.idUser != null ? req.params.idUser : req.body.idUser != null ? req.body.idUser : res.status(404).json({ error: "we need idUser" });
    const user = await UserService.FindOneById(idUser);
    res.locals.user = user;
    user ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "user": "user doesn't exist" }));
}

export async function UserExistEmail(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const email: string = req.body.email ? req.body.email : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "email": "we need email" }));
    const user = await UserService.FindOneByEmail(email);
    res.locals.user = user;
    user ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { "user": "user doesn't exist" }));
}

export async function CheckLoginAvailable(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    const email = req.body.email;
    const username = req.body.username;
    const userEmail = await UserService.FindOneByEmail(email);
    const userUsername = await UserService.FindOneByUsername(username);
    if (userUsername) {
        errors.username = "username already exist";
    }
    if (userEmail) {
        errors.email = "email already exist";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.username)) {
        errors.username = "we need username";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.password)) {
        errors.password = "we need password";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.email)) {
        errors.email = "we need email";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.description)) {
        errors.description = "we need description";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.firstName)) {
        errors.firstName = "we need firstName";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.lastName)) {
        errors.lastName = "we need lastName";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckUpdate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idUser)) {
        errors.idUser = "we need idUser";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckSignIn(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.email)) {
        errors.email = "we need email";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.password)) {
        errors.password = "we need password";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idUser)) {
        errors.idUser = "we need idUser";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}