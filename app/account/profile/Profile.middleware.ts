import * as express from "express";
import { ProfileService } from "./Profile.service"
import { SportService } from "../sport/Sport.service"
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"

export async function ProfileExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idProfile: number = req.params.idProfile != null ? req.params.idProfile : req.body.idProfile != null ? req.body.idProfile : res.status(404).json({ error: "we need idProfile" });
    const profile = await ProfileService.FindOneById(idProfile);
    res.locals.profile = profile;
    profile ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { profile: "profile doesn't exist" }));
}

export async function ProfileShouldntExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const idUser: number = req.body.idUser;
    const sport = await SportService.FindBySport(req.body.sport);
    const profile = await ProfileService.FindOneByUserAndSport(idUser, sport);
    !profile ? next() : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { profile: "profile doesn't exist" }));
}

export async function CheckCreate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.idUser)) {
        errors.idUser = "we need idUser";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.sport)) {
        errors.sport = "we need sport";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.size)) {
        errors.size = "we need size";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.weight)) {
        errors.weight = "we need weight";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.numero)) {
        errors.numero = "we need numero";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.position)) {
        errors.position = "we need position";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckJoin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)) {
        errors.idProfile = "we need idProfile";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idProfile)) {
        errors.idProfile = "we need idProfile";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(404).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}