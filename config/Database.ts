import { createConnection } from "typeorm";
import { User } from "../app/models/User.model";
import { Match } from "../app/models/Match.model";
import { Team } from "../app/models/Team.model";
import { Profile } from "../app/models/Profile.model";
import { Sport } from "../app/models/Sport.model";
import { Score } from "../app/models/Score.model";
import { TeamLeader } from "../app/models/TeamLeader.model";
import { config, DIALECT } from "../config";

export const Connection = createConnection({
    database: config.DATABASE.DB,
    entities: [
        User,
        Match,
        Team,
        Profile,
        Sport,
        Score,
        TeamLeader,
    ],
    host: config.DATABASE.SERVER,
    logging: false,
    password: config.DATABASE.PASSWORD,
    port: config.DATABASE.PORT_DB,
    synchronize: true,
    type: DIALECT,
    username: config.DATABASE.USER_DB,
});
