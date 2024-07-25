import { ActionModel } from "./models/Action.model";
import { CompanyModel } from "./models/Company.model";
import { GameModel } from "./models/Game.model";
import { getXataClient, type DatabaseSchema, type XataClient } from "./xata";
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
import type { TransactionOperation } from "@xata.io/client";
import type { CompanyFundamentalsModel } from "./models/CompanyFundamentals.model";
import type { CompanyFundamentalsController } from "./controllers/company-fundamentals.contoller";

export type Models = {
  ActionModel: ActionModel;
  CompanyModel: CompanyModel;
  CountryModel: CountryModel;
  GameModel: GameModel;
  WorldModel: WorldModel;
  EnvironmentModel: EnvironmentModel;
  EconomyModel: EconomyModel;
  CompanyFundamentalsModel: CompanyFundamentalsModel;
};
export type Controllers = {
  ActionsController: ActionsController;
  CompaniesController: CompaniesController;
  CountriesController: CountriesController;
  GamesController: GamesController;
  WorldController: WorldController;
  EnvironmentController: EnvironmentController;
  EconomyController: EconomyController;
  CompanyFundamentalsController: CompanyFundamentalsController;
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

  get companyFundamentalsController() {
    return this.getController("CompanyFundamentalsController");
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

  get companyFundamentalsModel() {
    return this.getModel("CompanyFundamentalsModel");
  }

  // get xata table columns
  columns<N extends string = "">(
    table: string
  ):
    | Array<{
        name: N;
        type: string;
        defaultValue: string;
      }>
    | undefined {
    // @ts-ignore
    return this.model.schema.tables.find((t) => t.name === table)?.columns;
  }

  async migrations_run(
    migrations: TransactionOperation<DatabaseSchema, keyof DatabaseSchema>[]
  ) {
    return await this.model.transactions.run(migrations);
  }

  calculateFactor(factor: number) {
    const random = Math.random() / 10;

    const num = random + factor;

    return Number(num.toFixed(3));
  }

  async dropDatabase(
    tables: Array<keyof DatabaseSchema> = [
      "action",
      "company",
      "country",
      "economy",
      "environment",
      "game",
      "world",
      "company_fundamentals",
    ]
  ) {
    function makeDeleteAction(id: string, table: keyof DatabaseSchema) {
      return { delete: { table, id } } as TransactionOperation<
        DatabaseSchema,
        keyof DatabaseSchema
      >;
    }
    try {
      const actions_migrations = tables.includes("action")
        ? await this.model.db.action
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "action")))
        : [];

      const companies_migrations = tables.includes("company")
        ? await this.model.db.company
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "company")))
        : [];

      const company_fundamentals_migrations = tables.includes(
        "company_fundamentals"
      )
        ? await this.model.db.company_fundamentals
            .select(["id"])
            .getAll()
            .then((act) =>
              act.map((a) => makeDeleteAction(a.id, "company_fundamentals"))
            )
        : [];

      const countries_migrations = tables.includes("country")
        ? await this.model.db.country
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "country")))
        : [];

      const economies_migrations = tables.includes("economy")
        ? await this.model.db.economy
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "economy")))
        : [];

      const environments_migrations = tables.includes("environment")
        ? await this.model.db.environment
            .select(["id"])
            .getAll()
            .then((act) =>
              act.map((a) => makeDeleteAction(a.id, "environment"))
            )
        : [];

      const games_migrations = tables.includes("game")
        ? await this.model.db.game
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "game")))
        : [];

      const worlds_migrations = tables.includes("world")
        ? await this.model.db.world
            .select(["id"])
            .getAll()
            .then((act) => act.map((a) => makeDeleteAction(a.id, "world")))
        : [];

      await this.migrations_run([
        ...actions_migrations,
        ...companies_migrations,
        ...company_fundamentals_migrations,
        ...countries_migrations,
        ...economies_migrations,
        ...environments_migrations,
        ...games_migrations,
        ...worlds_migrations,
      ]);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }
}
