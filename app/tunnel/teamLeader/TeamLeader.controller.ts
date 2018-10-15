import { Profile } from "../../account/profile/Profile.model";
import { Team } from "../team/Team.model";
import { TeamLeaderService } from "./TeamLeader.service";
import { TeamLeader } from "./TeamLeader.model";

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
