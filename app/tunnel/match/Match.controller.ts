import * as express from "express";
import { url } from "inspector";
import { SPORTS, NBPLAYER } from "./Match.enumeration";

export class MatchController {
    public static async All(req: express.Request, res: express.Response) {
        console.log(SPORTS.BASKET);
        console.log(NBPLAYER.BASKET);
    }
}
