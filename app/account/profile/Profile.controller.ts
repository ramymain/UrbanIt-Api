import * as express from "express";
import { Profile } from "./Profile.model";
import { UserService } from "../user/User.service";
import { ProfileService } from "./Profile.service";
import { TeamService } from "../../tunnel/team/Team.service";
import { TeamsHelpers } from "../../tunnel/team/Teams.helpers";
import { Score } from "../../score/score/Score.model";
import { ScoreService } from "../../score/score/Score.service";
import { validate } from "class-validator";
import { ResultHelpers } from '../../helpers/Result.helpers'
import { Sport } from "../sport/Sport.model";

export class ProfileController {

    public static async All(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.Find();
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", ProfileList));
    }

    public static async AllByPlayer(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.FindByPlayer(req.params.idUser);
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", ProfileList));
    }

    public static async Create(req: express.Request, res: express.Response) {
        const size: number = req.body.size;
        const weight: number = req.body.weight;
        const numero: number = req.body.numero;
        const position: string = req.body.position;
        
        const user = res.locals.user;
        const profile = new Profile();
        profile.sport = res.locals.sportModel;
        profile.size = size;
        profile.weight = weight;
        profile.numero = numero;
        profile.position = position;
        profile.user = user;

        try {
            const errors = await validate(profile);
            if (errors && errors.length > 0){
                var errorsJson = ResultHelpers.createErrorsValidate(errors)
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", errorsJson ));
            }
            const Result = await ProfileService.Save(profile);
            res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }

    public static async Update(req: express.Request, res: express.Response) {
        const size: number = req.body.size;
        const weight: number = req.body.weight;
        const numero: number = req.body.numero;
        const position: string = req.body.position;

        const profile = res.locals.profile;
        const profileUpdate = new Profile();
        profileUpdate.sport = (res.locals.sportModel ? res.locals.sportModel : profile.sport);
        profileUpdate.size = (size ? size : profile.size);
        profileUpdate.weight = (weight ? weight : profile.size);
        profileUpdate.numero = (numero ? numero : profile.numero);
        profileUpdate.position = (position ? position : profile.position);
        profileUpdate.user = profile.user


        try {
            const errors = await validate(profileUpdate);
            if (errors && errors.length > 0){
                var errorsJson = ResultHelpers.createErrorsValidate(errors)
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", errorsJson ));
            }
            const Result = await ProfileService.Save(profileUpdate);
            return res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }

    }

    public static async Find(req: express.Request, res: express.Response) {
        const profile = res.locals.profile;
        return profile ? res.status(200).json(ResultHelpers.createReturnJson(200, "success", profile)) : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { profile: "profile not found"}));
    }

    public static async FindByUserAndSport(req: express.Request, res: express.Response) {
        const idUser: number = req.params.idUser;
        const sport = res.locals.sportModel;

        const profile = await ProfileService.FindOneByUserAndSport(idUser, sport);
        return profile ? res.status(200).json(ResultHelpers.createReturnJson(200, "success", profile)) : res.status(404).json(ResultHelpers.createReturnJson(404, "error", { profile: "profile not found"}));
    }

    public static async Delete(req: express.Request, res: express.Response) {
        const idProfile: number = req.params.idProfile;


        try {
            await ProfileService.RemoveById(idProfile);
            return res.status(204).json(ResultHelpers.createReturnJson(204, "success", { user: "correctly removed" }));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const idTeam: number = req.body.idTeam;
        const profile = res.locals.profile;
        const sport = profile.sport;

        if (idTeam != null){
            const team = await TeamService.FindOneById(idTeam);
            if (team == null){
                return res.status(404).json(ResultHelpers.createReturnJson(404, "error", { team: "team doesn't exist" }));
            }
            if (team.isFill){
                return res.status(400).json(ResultHelpers.createReturnJson(400, "error", { server: "team is full" }));
            }
            return TeamsHelpers.SaveAndReturn(team, profile, res)
        }

        const teams = await TeamService.FindBySportNotFill(sport);
        const team = TeamsHelpers.Closest(teams, profile.ranking, undefined);

        if (team === undefined) {
            const teamName = ""
            const team = await TeamsHelpers.CreateTeam(teamName, sport);
            if (team == null){
                return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
            }
            return TeamsHelpers.SaveAndReturn(team, profile, res)
        }
        return TeamsHelpers.SaveAndReturn(team, profile, res)
    }

    public static async ScoreMatch(req: express.Request, res: express.Response) {
        const scored: number = req.body.score;
        const teamScore = res.locals.teamScore;

        const score = new Score();
        score.team = teamScore;
        score.match = teamScore.match;
        score.scored = scored;
        try {
            const Result = await ScoreService.Save(score);
            return res.status(200).json(ResultHelpers.createReturnJson(200, "success", Result))
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }
    
    public static async Best(req: express.Request, res: express.Response) {
        const sport: Sport = res.locals.sportModel;
        const take: number = req.params.take ? req.params.take : 10;
        const skip: number = req.params.skip ? req.params.skip : 0;
        const ProfileList = await ProfileService.FindBest(sport, take, skip);
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", ProfileList));
    }

    public static async Count(req: express.Request, res: express.Response) {
        const sport: Sport = res.locals.sportModel;
        const countPlayer = await ProfileService.Count(sport);
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", {countPlayer}));
    }

    public static async GetPosition(req: express.Request, res: express.Response) {
        const profile: Profile = res.locals.profile;
        var position = await ProfileService.getPosition(profile);
        position += 1;
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", {position}));
    }
}
