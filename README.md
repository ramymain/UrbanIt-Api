# Urban-It API
Node.js + ExpressJS + TypeOrm + Typescript + JWT + ES2015 + Clustering + Tslint + Mocha + Chai + Supertest

## Structure
```json
/app
	/controllers (Controllers)
	/middlewares (Middlewares des routes de l'app)
	/routes (Routes des Controllers)
	/service (Services a utiliser dans les Controllers)
	/entity (Models de la base de donnees)
	/repository (Requete personnalise)
/config
	/Router.ts (Fichier de configuration des routes)
	/Database (Configuration de la bdd)
	/Server.ts (Configuration du server)
config.ts (Config de l'app)
tsconfig.json (Config du typescript)
tslint.json (Config rules typescript)
Index.ts (Fichier de depart de l'app)
```
# Install
1. Cloner le repository

2. npm install

3. Modifier le fichier ./config.ts avec tes parametres:

```js

const LOCAL_CONFIGURATION = {
	DB: "urban_it",
	PASSWORD: "",
	PORT_DB: 3306,
	SERVER: "127.0.0.1",
	USER_DB: "root",
};

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
```

# Start App
When execute any of this commands the app start with clustering, creating many cluster apps depending of the numbers of CPU's your computer had.
### Development: In Development mode the express app is starter with nodemon for automatic refresh when do changes.
	npm run dev
### Test: Run test in development environment
	npm test
### Production: Run app in production environment
	npm start
