import type { EnvironmentRecord } from "../xata";
import type { Root } from "../root";
import { v4 as uuidv4 } from "uuid";

export class GamesController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(options: {
    starting_country: string;
    company_name: string;
    environment?: Partial<EnvironmentRecord>;
  }) {
    const countryId = uuidv4();
    const companyId = uuidv4();
    const environmentId = uuidv4();
    const worldId = uuidv4();
    const economyId = uuidv4();
    const gameId = uuidv4();

    // Country
    const countryModel = this.root.getModel("CountryModel");
    const country = countryModel?.migration_create({
      id: countryId,
      name: options.starting_country,
    });

    // Economy
    const economyModel = this.root.getModel("EconomyModel");
    const economy = economyModel?.migration_create({
      id: economyId,
    });

    console.log("economy :>> ", economy);

    // Company
    const companyModel = this.root.getModel("CompanyModel");
    const company = companyModel?.migration_create({
      id: companyId,
      name: options.company_name,
    });

    // Environment
    const environmentModel = this.root.getModel("EnvironmentModel");
    const environment = environmentModel?.migration_create({
      id: environmentId,
      natural_disasters: options.environment?.natural_disasters ?? [],
      oil_spills: options.environment?.oil_spills ?? [],
    });

    // World
    const worldModel = this.root.getModel("WorldModel");
    const world = worldModel?.migration_create({
      id: worldId,
      environment: environmentId,
      economy: economyId,
    });

    const gameModel = this.root.getModel("GameModel");
    const game = gameModel?.migration_create({
      id: gameId,
      company: companyId,
      starting_country: countryId,
      world: worldId,
    });

    return await this.root.gameModel?.migrations_run([
      country,
      company,
      economy,
      environment,
      world,
      game,
    ]);
  }

  async update(id: any, body: any) {
    throw new Error("Method not implemented.");
  }
}
