import { env } from "process";

export const DIALECT = "mysql";

// const LOCAL_CONFIGURATION = {
// 	DB: "urban_it",
// 	PASSWORD: "8Md3rp6ty",
// 	PORT_DB: 3306,
// 	SERVER: "127.0.0.1",
// 	USER_DB: "bostonrootuser",
// };

const LOCAL_CONFIGURATION = {
	DB: "urbanit",
	PASSWORD: "8Md3rp6ty",
	PORT_DB: 3306,
	SERVER: "urbanit.cxxxamtikht7.eu-west-3.rds.amazonaws.com",
	USER_DB: "bostonrootuser",
};

// const LOCAL_CONFIGURATION = {
// 	DB: env.DB || "prod",
// 	PASSWORD: env.PASSWORD || "",
// 	PORT_DB: Number(env.PORT_DB) || 3306,
// 	SERVER: env.SERVER || "localhost",
// 	USER_DB: env.USER_DB || "root",
// };

const PRODUCTION_CONFIGURATION = {
	DB: env.DB || "prod",
	PASSWORD: env.PASSWORD || "",
	PORT_DB: Number(env.PORT_DB) || 3306,
	SERVER: env.SERVER || "localhost",
	USER_DB: env.USER_DB || "root",
};

export const config = {
	DATABASE: env.NODE_ENV === "PRODUCTION" ? PRODUCTION_CONFIGURATION : LOCAL_CONFIGURATION,
	PORT_APP: 1344,
	SECRET: "HltH3R3",
};
