import { ActionModel } from "./models/Action.model";
import { CompanyModel } from "./models/Company.model";
import { GameModel } from "./models/Game.model";
import { getXataClient, type XataClient } from "./xata";
import { ActionsController } from "./controllers/actions.controller";
import { CompaniesController } from "./controllers/companies.controller";
import { GamesController } from "./controllers/games.controller";
import type { EnvironmentController } from "./controllers/environment.controller";
import type { WorldController } from "./controllers/world.controller";
import type { EnvironmentModel } from "./models/Environment.model";
import type { WorldModel } from "./models/World.model";
import type { CountryModel } from "./models/Country.model";
import type { CountriesController } from "./controllers/countries.controller";
import type { EconomyModel } from "./models/Economy.model";
import type { EconomyController } from "./controllers/economy.controller";

export type Models = {
  ActionModel: ActionModel;
  CompanyModel: CompanyModel;
  CountryModel: CountryModel;
  GameModel: GameModel;
  WorldModel: WorldModel;
  EnvironmentModel: EnvironmentModel;
  EconomyModel: EconomyModel;
};
export type Controllers = {
  ActionsController: ActionsController;
  CompaniesController: CompaniesController;
  CountriesController: CountriesController;
  GamesController: GamesController;
  WorldController: WorldController;
  EnvironmentController: EnvironmentController;
  EconomyController: EconomyController;
};

export class Root {
  model: XataClient;

  models: Map<keyof Models, Models[keyof Models]>;
  controllers: Map<keyof Controllers, Controllers[keyof Controllers]>;

  constructor(
    {
      models,
      controllers,
    }: {
      models: any[];
      controllers: any[];
    } = {
      models: [],
      controllers: [],
    }
  ) {
    this.model = getXataClient();

    this.controllers = new Map();
    this.models = new Map();

    controllers.map((Controller) => {
      this.controllers.set(Controller.name, new Controller(this));
    });

    models.map((Model) => {
      this.models.set(Model.name, new Model(this));
    });
  }

  getController<K extends keyof Controllers>(key: K): Controllers[K] {
    return this.controllers.get(key) as Controllers[K];
  }

  get actionController() {
    return this.getController("ActionsController");
  }

  get companyController() {
    return this.getController("CompaniesController");
  }

  get gameController() {
    return this.getController("GamesController");
  }

  get worldController() {
    return this.getController("WorldController");
  }

  get environmentController() {
    return this.getController("EnvironmentController");
  }

  get countryController() {
    return this.getController("CountriesController");
  }

  get economyController() {
    return this.getController("EconomyController");
  }

  getModel<K extends keyof Models>(key: K): Models[K] {
    return this.models.get(key) as Models[K];
  }

  get actionModel() {
    return this.getModel("ActionModel");
  }

  get companyModel() {
    return this.getModel("CompanyModel");
  }

  get gameModel() {
    return this.getModel("GameModel");
  }

  get worldModel() {
    return this.getModel("WorldModel");
  }

  get environmentModel() {
    return this.getModel("EnvironmentModel");
  }

  get countryModel() {
    return this.getModel("CountryModel");
  }

  get economyModel() {
    return this.getModel("EconomyModel");
  }

  // get xata table columns
  columns(table: string):
    | Array<{
        name: string;
        type: string;
        defaultValue: string;
      }>
    | undefined {
    // @ts-ignore
    return this.model.schema.tables.find((t) => t.name === table)?.columns;
  }
}
