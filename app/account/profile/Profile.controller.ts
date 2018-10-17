import * as express from "express";
import { Profile } from "./Profile.model";
import { UserService } from "../user/User.service";
import { ProfileService } from "./Profile.service";
import { TeamService } from "../../tunnel/team/Team.service";
import { TeamsHelpers } from "../../tunnel/team/Teams.helpers";
import { Score } from "../../score/Score.model";
import { ScoreService } from "../../score/Score.service";
import { validate } from "class-validator";
import { ResultHelpers } from '../../helpers/Result.helpers'

export class ProfileController {

    public static async All(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.Find();
        return res.status(200).json(ProfileList);
    }

    public static async AllByPlayer(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.FindByPlayer(req.params.idUser);
        return res.status(200).json(ProfileList);
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
        return profile ? res.status(200).json(profile) : res.status(404).json({message: "profile not found"});
    }

    public static async FindByUserAndSport(req: express.Request, res: express.Response) {
        const idProfile: number = req.params.idProfile;
        const sport = res.locals.sportModel;

        const profile = await ProfileService.FindOneByUserAndSport(idProfile, sport);
        return profile ? res.status(200).json(profile) : res.status(404).json({message: "profile not found"});
    }

    public static async Delete(req: express.Request, res: express.Response) {
        const id: number = req.params.idProfile;

        try {
            await ProfileService.RemoveById(id);
            return res.status(204).json({message: "correctly removed"});
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const idTeam: number = req.body.idTeam;
        const profile = res.locals.profile;
        const sport = profile.sport;

        if (idTeam != null){
            const team = await TeamService.FindOneById(idTeam);
            if (team == null){
                return res.status(404).json({message: "team doesn't exist"});
            }
            if (team.isFill){
                return res.status(404).json({message: "team is full"});
            }
            return TeamsHelpers.SaveAndReturn(team, profile, res)
        }

        const teams = await TeamService.FindBySportNotFill(sport);
        const team = TeamsHelpers.Closest(teams, profile.ranking, undefined);

        if (team === undefined) {
            const teamName = ""
            const team = await TeamsHelpers.CreateTeam(teamName, sport);
            if (team == null){
                return res.status(404).json({error: "server error"});
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
            return res.status(200).json(Result);
        } catch (ex) {
            console.log(ex);
            return res.status(404).json({error: "server error"});
        }
    }
    
}
