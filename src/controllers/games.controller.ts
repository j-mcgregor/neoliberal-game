import type { EditableData, Identifiable } from "@xata.io/client";
import type { ICompany, ICountry } from "..";
import { Company } from "../Company";
import { Country } from "../Country";
import { GameModel } from "../models/Game.model";
import type { GameRecord } from "../xata";

export class GamesController {
  protected model: GameModel;

  constructor() {
    this.model = new GameModel();
  }

  isValid(value: unknown): value is GameRecord {
    return typeof value === "object" && value !== null;
  }

  makeGame(game: unknown): Partial<EditableData<GameRecord>> & Identifiable {
    if (typeof game !== "object") {
      throw new Error("Game must be an object");
    }

    const newBody = {} as Partial<EditableData<GameRecord>> & Identifiable;

    if (this.isValid(game)) {
      if (game.company) {
        newBody.company = game.company;
      }

      if (game.progress) {
        newBody.progress = game.progress;
      }

      if (game.score_factor) {
        newBody.score_factor = game.score_factor;
      }

      if (game.starting_country) {
        newBody.starting_country = game.starting_country;
      }

      if (game.turn) {
        newBody.turn = game.turn;
      }

      return newBody as Partial<EditableData<GameRecord>> & Identifiable;
    }

    throw new Error("Game is not valid");
  }

  async update(id: any, body: unknown) {
    if (!id || !body) {
      throw new Error("Game ID and body are required");
    }

    try {
      const args = this.makeGame(body);

      const game = await this.model.update(args);

      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async createGame(data: {
    company: Pick<ICompany, "name">;
    country: Pick<ICountry, "name">;
  }) {
    const country = new Country(data.country.name);
    const company = new Company(data.company.name, country);

    try {
      const game = await GameModel.init(country, company);

      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async deleteGame(id: string) {
    if (!id) {
      throw new Error("Game ID is required");
    }

    try {
      await this.model.delete(id);

      return true;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  async playRound(id?: string) {
    if (!id) {
      throw new Error("Game ID is required");
    }

    try {
      const game = await this.model.playRound({ id });

      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * GET GAME
   */
  async getGame(id: string) {
    if (!id) {
      throw new Error("Game ID is required");
    }

    try {
      const game = await this.model.getOne(id);
      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
