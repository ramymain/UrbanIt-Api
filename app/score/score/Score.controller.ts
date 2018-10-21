import * as express from "express";
import { ResultHelpers } from '../../helpers/Result.helpers'
import { Score } from "./Score.model";
import { ScoreService } from "./Score.service"
import { Team } from "../../tunnel/team/Team.model";

export class ScoreController {

    public static async Score(req: express.Request, res: express.Response) {
        var errors = JSON.parse("{}");
        var teams = JSON.parse(req.body.idsTeam);
        var scores = JSON.parse(req.body.scores);
        var i = 0;
        var scoreModels = await ScoreService.FindByMatch(parseInt(res.locals.match.id));
        var scoresResult:Score[] = [];
        Object.keys(teams).forEach(async function (key) {
            var teamId = parseInt(teams[key]);
            var score = new Score();
            score.match = res.locals.match;
            score.profile = [ res.locals.profile ];
            res.locals.match.teams.forEach(function (team: Team) {
                if (team.id == teamId) {
                    score.team = team;
                }
            });
            score.scored = scores[Object.keys(scores)[i]];
            i += 1;
            try {
                var scoreTeam = scoreModels.filter(sco => sco.team.id == teamId)
                var scoreTeamValid = scoreModels.filter(sco => sco.team.id == teamId && sco.profile.filter(profile => profile.id == res.locals.profile.id).length > 0)
                if (scoreTeamValid.length <= 0 && (parseInt(res.locals.match.sport.nbTeam)) > scoreTeam.length) {
                    const scoreResult = await ScoreService.Save(score);
                    scoresResult.push(scoreResult);
                }
            } catch (ex) {
                console.log(ex);
                errors.score = "error during saving score(s)";
            }
        });
        if (errors && Object.keys(errors).length > 0) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
        else {
            return res.status(201).json(ResultHelpers.createReturnJson(201, "success", { score: JSON.stringify(scoresResult) }));
        }
    }
}
