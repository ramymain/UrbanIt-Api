import * as express from "express";
import { url } from "inspector";
import { MatchService } from "./Match.service";
import { TeamService } from "../team/Team.service";
import { Score } from "../../score/score/Score.model"
import { TeamsHelpers } from "../team/Teams.helpers";
import { MatchHelpers } from "./Match.helpers";
import { ResultHelpers } from "../../helpers/Result.helpers";
import { Match } from "./Match.model";
import { Sport } from "../..//account/sport/Sport.model";

export class MatchController {
    public static async All(req: express.Request, res: express.Response) {
        const MatchList = await MatchService.Find();
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", MatchList));
    }

    
    public static async InProgress(req: express.Request, res: express.Response) {
        const sport: Sport = res.locals.sportModel;
        const countMatchInProgress = await MatchService.CountInProgress(sport);
        return res.status(200).json(ResultHelpers.createReturnJson(200, "success", {countMatchInProgress}));
    }

    public static Ranking(match: Match): Match {
        var elo_factor = 40;
        for (var team of match.teams) {
            var match_result = 0;
            var scoreMyTeam = team.scores.find(sco => sco.team.id == team.id);
            var otherTeam = match.teams.filter(te => te.id != team.id);
            var scoreOtherTeam: Score[] = []; 
            otherTeam.forEach(ot => ot.scores.forEach(sco => scoreOtherTeam.push(sco)));
            if (scoreOtherTeam.every(te => te.scored == scoreMyTeam.scored)) {
                match_result = 0.5;
            } else if (scoreOtherTeam.every(te => te.scored < scoreMyTeam.scored)) {
                match_result = 1;
            }
            var rankTeams: number = 0;
            for (var te of scoreOtherTeam) {
                rankTeams = Number(rankTeams) + Number(te.team.ranking);
            }
            rankTeams = rankTeams / scoreOtherTeam.length;
            for (var profile of team.profiles) {
                var winning_probability = 1 / (1 + Math.pow(10, (Number(rankTeams) - Number(profile.ranking)) / 400));
                var new_rank = Number(profile.ranking) + Number(elo_factor) * (Number(match_result) - Number(winning_probability));
                profile.ranking = Math.round(new_rank)
            }
        }
        for (var team of match.teams) {
            team.ranking = Math.round(TeamsHelpers.SumAverageRank(team));
        }
        match.ranking = Math.round(MatchHelpers.SumAverageRank(match));
        return match;
    }
}
