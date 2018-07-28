import * as express from "express";
import { UserService } from "../services/User.service"

export async function UserExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id_user: number = req.params.id_user != null ? req.params.id_user : req.body.id_user != null ? req.body.id_user : res.status(404).json({error: "we need id_user"});
    const user = await UserService.FindOneById(id_user);
    user ? next() : res.status(404).json({error: "user doesn't exist"});
}