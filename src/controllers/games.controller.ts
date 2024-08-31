import type { EnvironmentRecord, GameRecord } from "../xata";
import type { Root } from "../root";
import { v4 as uuidv4 } from "uuid";
import type { EditableData, Identifiable } from "@xata.io/client";
import { createAction } from "../lib/actions/create-action";
import { techTree } from "../constants/tech-tree";
import type { DifficultyEnum } from "../../types/enums";
import { CompanySize } from "../constants/Difficulty.constants";

export class GamesController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(options: {
    starting_country: string;
    company_name: string;
    environment?: Partial<EnvironmentRecord>;
    difficulty?: DifficultyEnum;
  }) {
    const countryId = uuidv4();
    const companyId = uuidv4();
    const companyFundamentalsId = uuidv4();
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

    // Company
    const companyModel = this.root.getModel("CompanyModel");
    const company = companyModel?.migration_create({
      id: companyId,
      name: options.company_name,
      company_fundamentals: companyFundamentalsId,
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
      difficulty: options.difficulty,
    });

    // Company Fundamentals
    const companyFundamentalsModel = this.root.getModel(
      "CompanyFundamentalsModel"
    );
    const companyFundamentals = companyFundamentalsModel?.migration_create({
      id: companyFundamentalsId,
      technology: JSON.stringify(techTree),
      company_size: CompanySize.MICRO,
    });

    return await this.root.gameModel?.migrations_run([
      companyFundamentals,
      country,
      company,
      economy,
      environment,
      world,
      game,
    ]);
  }

  async update(body: Partial<EditableData<GameRecord>> & Identifiable) {
    return await this.root.gameModel.update({
      ...body,
    });
  }

  async turn(id: string, action: ReturnType<typeof createAction>) {
    const game = await this.root.model.db.game
      .select([
        "world.economy.id",
        "world.environment.id",
        "score_factor",
        "company.id",
      ])
      .getFirst({
        filter: { id },
      });

    // play environment
    if (game?.world?.environment?.id) {
      await this.root.environmentController.turn(game.world.environment.id);
    }

    // play economy
    if (game?.world?.economy?.id) {
      await this.root.economyController.turn(game.world.economy.id);
    }

    // adjust score_factor
    const score_factor = game?.score_factor
      ? this.root.calculateFactor(game.score_factor)
      : 1;

    // dispatch action
    await this.root.actionController.turnAction(action);

    await this.update({
      id,
      score_factor,
    });
  }
}
