import { App } from "@j-mcgregor/bun-express";

import { Root } from "./root";
import { ActionsController } from "./controllers/actions.controller";
import { CompaniesController } from "./controllers/companies.controller";
import { ActionModel } from "./models/Action.model";
import { CompanyModel } from "./models/Company.model";
import { WorldController } from "./controllers/world.controller";
import { EnvironmentController } from "./controllers/environment.controller";
import { WorldModel } from "./models/World.model";
import { EnvironmentModel } from "./models/Environment.model";
import { GamesController } from "./controllers/games.controller";
import { GameModel } from "./models/Game.model";
import { CountriesController } from "./controllers/countries.controller";
import { CountryModel } from "./models/Country.model";
import { EconomyModel } from "./models/Economy.model";
import { EconomyController } from "./controllers/economy.controller";
import { gameRoutes } from "./routes/games.route";
import { companyRoutes } from "./routes/companies.route";
import { worldRoutes } from "./routes/world.route";
import { economyRoutes } from "./routes/economy.route";
import { environmentRoutes } from "./routes/environment.route";
import { rootRoutes } from "./routes/root.route";
import { CompanyFundamentalsModel } from "./models/CompanyFundamentals.model";
import { CompanyFundamentalsController } from "./controllers/company-fundamentals.contoller";
import { companyFundamentalsRoutes } from "./routes/company-fundamentals.route";

const app = new App({
  port: 8080,
  hostname: "localhost",
  prefix: "/api",
});

const root = new Root({
  models: [
    WorldModel,
    EnvironmentModel,
    ActionModel,
    CompanyModel,
    CountryModel,
    GameModel,
    EconomyModel,
    CompanyFundamentalsModel,
  ],
  controllers: [
    WorldController,
    EnvironmentController,
    ActionsController,
    CompaniesController,
    CountriesController,
    GamesController,
    EconomyController,
    CompanyFundamentalsController,
  ],
});

rootRoutes(app, root);
companyFundamentalsRoutes(app, root);
gameRoutes(app, root);
companyRoutes(app, root);
worldRoutes(app, root);
economyRoutes(app, root);
environmentRoutes(app, root);

// print all routes

app.printRoutes();

app.serve();
