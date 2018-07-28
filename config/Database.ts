import { createConnection } from "typeorm";
import { User } from "../app/models/User.model";
import { Match } from "../app/models/Match.model";
import { Team } from "../app/models/Team.model";
import { Profile } from "../app/models/Profile.model";
import { Sport } from "../app/models/Sport.model";
import { config, DIALECT } from "../config";

export const Connection = createConnection({
    database: config.DATABASE.DB,
    entities: [
        User,
        Match,
        Team,
        Profile,
        Sport,
    ],
    host: config.DATABASE.SERVER,
    logging: false,
    password: config.DATABASE.PASSWORD,
    port: config.DATABASE.PORT_DB,
    synchronize: true,
    type: DIALECT,
    username: config.DATABASE.USER_DB,
});
