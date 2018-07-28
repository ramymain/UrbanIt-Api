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
        const id_user: number = req.body.id_user;
        const sport: string = req.body.sport;
        const size: number = req.body.size;
        const weight: number = req.body.weight;
        const numero: number = req.body.numero;
        const position: string = req.body.position;
        
        const user = await UserService.FindOneById(id_user);
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
            return res.status(404).json({message: "server error"});
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
            return res.status(404).json({message: "server error"});
        }
    }

    public static async JoinTeam(req: express.Request, res: express.Response) {
        const id_user: number = req.body.id_user;
        const sport: string = req.body.sport;
        const id_team: number = req.body.id_team;
        const profile = await ProfileService.FindOneById(id_user, sport);

        if (id_team != null){
            const team = await TeamService.FindOneById(id_team);
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
                return res.status(404).json({message: "server error"});
            }
            return TeamsHelpers.SaveAndReturn(team, profile, res)
        }

        return TeamsHelpers.SaveAndReturn(team, profile, res)

    }

}
