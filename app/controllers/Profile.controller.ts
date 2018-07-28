import * as express from "express";
import { Profile } from "../models/Profile.model";
import { UserService } from "../services/User.service";
import { url } from "inspector";
import { ProfileService } from "../services/Profile.service";
import { TeamService } from "../services/Team.service";
import { TeamsHelpers } from "../helpers/Teams.helpers";

export class ProfileController {

    public static async All(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.Find();
        return res.status(200).json(ProfileList);
    }

    public static async AllByPlayer(req: express.Request, res: express.Response) {
        const ProfileList = await ProfileService.FindByPlayer(req.params.id);
        return res.status(200).json(ProfileList);
    }

    public static async Create(req: express.Request, res: express.Response) {
        const idUser: number = req.body.idUser;
        const sport: string = req.body.sport;
        const size: number = req.body.size;
        const weight: number = req.body.weight;
        const numero: number = req.body.numero;
        const position: string = req.body.position;
        
        const user = await UserService.FindOneById(idUser);
        const profile = new Profile();
        profile.sport = sport;
        profile.size = size;
        profile.weight = weight;
        profile.numero = numero;
        profile.position = position;
        profile.user = user;

        try {
            const Result = await ProfileService.Save(profile);
            return res.status(200).json(Result);
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async Find(req: express.Request, res: express.Response) {
        const id: number = req.params.id;
        const sport: string = req.params.sport;
        const profile = await ProfileService.FindOneById(id, sport);
        return profile ? res.status(200).json(profile) : res.status(404).json({message: "profile not found"});
    }

    public static async Delete(req: express.Request, res: express.Response) {
        const id: number = req.body.id;

        try {
            await ProfileService.RemoveById(id);
            return res.status(204).json({message: "correctly removed"});
        } catch (ex) {
            return res.status(404).json({error: "server error"});
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const idUser: number = req.body.idUser;
        const sport: string = req.body.sport;
        const idTeam: number = req.body.idTeam;
        const profile = await ProfileService.FindOneById(idUser, sport);

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
        const team = TeamsHelpers.Closest(teams, profile.ranking);

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

}
