import * as express from "express";
import { ResultHelpers } from '../../helpers/Result.helpers'
import { Score } from "./Score.model";
import { ScoreService } from "./Score.service"
import { Team } from "../../tunnel/team/Team.model";
import { ScoreVerif } from "../scoreVerif/ScoreVerif.model";
import { ScoreVerifService } from "../scoreVerif/ScoreVerif.service";
import { Match } from "../../tunnel/match/Match.model";
import { MatchService } from "../../tunnel/match/Match.service";
import { MatchController } from "../../tunnel/match/Match.controller";

export class ScoreController {

    public static async Score(req: express.Request, res: express.Response) {
        var teams = JSON.parse(req.body.idsTeam);
        var scores = JSON.parse(req.body.scores);
        var i = 0;
        var match: Match = res.locals.match;
        var scoreModels = await ScoreService.FindByMatch(match.id);
        var scoreVerif = new ScoreVerif();
        scoreVerif.isError = false;
        scoreVerif.isValid = true;
        var scoreVerifCreate: boolean = false;
        for (const key of Object.keys(teams)) {
            var teamId = parseInt(teams[key]);
            var score = new Score();
            score.profile = [res.locals.profile];
            match.teams.forEach(function (team: Team) {
                if (team.id == teamId) {
                    score.team = team;
                }
            });
            score.scored = scores[Object.keys(scores)[i]];
            i += 1;
            var scoreTeam = scoreModels.filter(sco => sco.team.id == teamId)
            var scoreTeamValid = scoreModels.filter(sco => sco.team.id == teamId && sco.profile.filter(profile => profile.id == res.locals.profile.id).length > 0)
            if (scoreTeamValid.length <= 0) {
                if (match.sport.nbTeam == (scoreTeam.length + 1)) {
                    scoreVerifCreate = true;
                    scoreTeam.forEach(function (element) {
                        if (element.scored != score.scored) {
                            scoreVerif.isError = true;
                            scoreVerif.isValid = false;
                        }
                    })
                    match.scores.push(score);
                }
                else if (match.sport.nbTeam > scoreTeam.length) {
                    match.scores.push(score);
                }
            }
        };
        if (scoreVerifCreate) {
            match.scoreVerif = scoreVerif;
            if (scoreVerif.isValid) {
                match = MatchController.Ranking(match);
            }
        }
        try {
            await MatchService.Save(match);
            return res.status(201).json(ResultHelpers.createReturnJson(201, "success", match));
        } catch (ex) {
            return res.status(500).json(ResultHelpers.createReturnJson(500, "error", { server: "internal server error" }));
        }
    }
}
