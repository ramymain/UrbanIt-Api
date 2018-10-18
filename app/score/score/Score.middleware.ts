import * as express from "express";
import { Team } from "../../tunnel/team/Team.model"
import { StringHelpers } from "../../helpers/String.helpers"
import { ResultHelpers } from "../../helpers/Result.helpers"


export async function CheckEntry(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    if (StringHelpers.isNullOrWhitespace(req.params.idMatch)) {
        errors.idProfile = "we need idMatch";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.idProfile)) {
        errors.idProfile = "we need idProfile";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.idsTeam)) {
        errors.idsTeam = "we need idsTeam";
    }
    if (StringHelpers.isNullOrWhitespace(req.body.scores)) {
        errors.scores = "we need scores";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}

export async function CheckJson(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    try {
        var teams = JSON.parse(req.body.idsTeam);
        var scores = JSON.parse(req.body.scores);
    } catch (ex) {
        errors.server = "internal server error";
    }
    if (errors && Object.keys(errors).length > 0) {
        res.status(500).json(ResultHelpers.createReturnJson(500, "error", errors));
    }
    else {
        if ((teams && Object.keys(teams).length <= 0)) {
            errors.idsTeam = "json teams incorrect";
        }
        if ((scores && Object.keys(scores).length <= 0)) {
            errors.scores = "json scores incorrect";
        }

        if (Object.keys(teams).length != Object.keys(scores).length) {
            errors.scores = "json doesn't have the same elememt number";
        }
        if (errors && Object.keys(errors).length > 0) {
            res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
        }
        else {
            next();
        }
    }
}

export async function CheckTeamInMatchAndTeamLeader(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    var errors = JSON.parse("{}");
    var teams = JSON.parse(req.body.idsTeam);
    var found = false;
    var foundTeamLeader = false;
    var idProfile = parseInt(req.body.idProfile);
    teams.forEach(function (teamId: number) {
        found = false;
        res.locals.match.teams.forEach(function (team: Team) {
            if (team.id == teamId) {
                found = true;
            }
            if (team.teamLeader.id == idProfile) {
                foundTeamLeader = true;
            }
        });
        if (!found) {
            res.status(400).json(ResultHelpers.createReturnJson(400, "error", { idsTeam: "one or more team(s) doesn't exist" }));
        }
    });
    if (!foundTeamLeader) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", { idsTeam: "you're not the team leader" }));
    }
    else if (errors && Object.keys(errors).length > 0) {
        res.status(400).json(ResultHelpers.createReturnJson(400, "error", errors));
    }
    else {
        next();
    }
}