import * as express from "express";
import { UserService } from "../services/User.service"

export async function UserExist(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    const id: number = req.params.id != null ? req.params.id : req.body.id != null ? req.body.id : res.status(404).json({error: "user doesn't exist"});
    const user = await UserService.FindOneById(id);
    user ? next() : res.status(404).json({error: "user doesn't exist"});
}