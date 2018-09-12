import * as express from "express";
import * as jwt from "express-jwt";
import { JWTRoute } from "../app/routes/Jwt.route";
import { TestRoute } from "../app/routes/Test.route";
import { UserRoute } from "../app/routes/User.route";
import { ProfileRoute } from "../app/routes/Profile.route";
import { MatchRoute } from "../app/routes/Match.route";
import { TeamRoute } from "../app/routes/Team.route";
import { config } from "../config";

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

export const ROUTER: IROUTER[] = [ {
    handler: TestRoute,
    middleware: [],
    path: "/test",
}, {
    handler: JWTRoute,
    middleware: [],
    path: "/JWT",
}, {
    handler: UserRoute,
    middleware: [
        jwt({secret: config.SECRET}),
    ],
    path: "/user/jwt",
}, {
    handler: UserRoute,
    middleware: [],
    path: "/user",
}, {
    handler: ProfileRoute,
    middleware: [],
    path: "/profile",
}, {
    handler: MatchRoute,
    middleware: [],
    path: "/match",
}, {
    handler: TeamRoute,
    middleware: [],
    path: "/team",
}];
