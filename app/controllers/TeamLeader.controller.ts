import { Profile } from "../models/Profile.model";
import { Team } from "../models/Team.model";
import { TeamLeaderService } from "../services/TeamLeader.service";
import { TeamLeader } from "../models/TeamLeader.model";

export class TeamLeaderController {

    public static async Create(profile: Profile, team: Team) {
        var teamLeader = new TeamLeader();
        teamLeader.team = team;
        teamLeader.profile = profile;

        try {
            const Result = await TeamLeaderService.Save(teamLeader);
            return Result;
        } catch (ex) {
            return null;
        }
    }

}
