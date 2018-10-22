import * as express from "express";
import { SportService } from "./Sport.service"
import { ResultHelpers } from '../../helpers/Result.helpers'

export class SportController {

    public static async All(req: express.Request, res: express.Response) {
        const SportList = await SportService.Find();
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", SportList));
    }
    
}
