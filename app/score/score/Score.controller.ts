import * as express from "express";
import { ResultHelpers } from '../../helpers/Result.helpers'
import { Score } from "./Score.model";
import { ScoreService } from "./Score.service"
import { Team } from "../../tunnel/team/Team.model";

export class ScoreController {

    public static async Score(req: express.Request, res: express.Response) {
        var teams = JSON.parse(req.body.idsTeam);
        var scores = JSON.parse(req.body.scores);
        var i = 0;
        // teams.forEach(async function(teamId: number) {
        //     var score = new Score();
        //     score.match = res.locals.match;
        //     res.locals.match.teams.forEach(function(team: Team) {
        //         if (team.id == teamId) {
        //             score.team = team;
        //         }
        //     });
        //     score.scored = scores[Object.keys(scores)[i]];
        //     i += 1;
        //     try {
        //         await ScoreService.Save(score);
        //     } catch (ex) {
        //         return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        //     }
        // });
    }
}
