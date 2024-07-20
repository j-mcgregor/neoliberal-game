import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import type { ICompany, ICountry, IGame } from "..";
import {
  getXataClient,
  type DatabaseSchema,
  type GameRecord,
  type WorldRecord,
  type XataClient,
} from "../xata";
import { v4 as uuidv4 } from "uuid";

export class GameModel {
  #gameRecord: Repository<GameRecord>;

  constructor() {
    this.#gameRecord = getXataClient().db.game;
  }

  async create(
    game: Omit<EditableData<GameRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#gameRecord.create(game);
  }
}

export class _GameModel {
  game?: IGame;
  xata: XataClient;
  country?: ICountry;
  company?: ICompany;

  constructor() {
    this.xata = getXataClient();
  }

  static async init(_country: ICountry, _company: ICompany, world: string) {
    const xata = getXataClient();
    const countryId = uuidv4();
    const companyId = uuidv4();
    const gameId = uuidv4();

    console.log("worldId :>> ", world);

    const country: TransactionOperation<DatabaseSchema, "country"> = {
      insert: {
        table: "country",
        record: {
          id: countryId,
          name: _country.name,
          gdp: _country.gdp,
        },
      },
    };

    const company: TransactionOperation<DatabaseSchema, "company"> = {
      insert: {
        table: "company",
        record: {
          id: companyId,
          name: _company.name,
          company_type: _company.company_type,
          starting_country: countryId,
        },
      },
    };

    const game: TransactionOperation<DatabaseSchema, "game"> = {
      insert: {
        table: "game",
        record: {
          id: gameId,
          company: companyId,
          starting_country: countryId,
          score_factor: 0.05,
          turn: 0,
          progress: 0,
          world: world,
        },
      },
    };

    try {
      await xata.transactions.run([country, company, game]);

      const _game = await xata.db.game.read(gameId);

      return _game;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * UPDATE
   */

  async update(body: Partial<EditableData<GameRecord>> & Identifiable) {
    if (!body.id || !body) {
      throw new Error("Game ID and body are required");
    }

    const xata = getXataClient();

    try {
      const game = await xata.db.game.read(body.id);

      if (!game) {
        throw new Error("Game not found");
      }

      const updatedGame = await xata.db.game.update(body);

      return updatedGame;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * PLAY ROUND
   */

  async playRound(body: Partial<EditableData<GameRecord>> & Identifiable) {
    try {
      const current = await this.xata?.db.game.read(body.id);

      const nextTransaction: TransactionOperation<DatabaseSchema, "game"> = {
        update: {
          table: "game",
          id: body.id,
          fields: {
            turn: Number(current?.turn ?? 0) + 1,
            progress: Number(current?.progress ?? 0) + 1,
          },
        },
      };

      await this.xata?.transactions.run([nextTransaction]);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * DELETE
   */

  async delete(id: string) {
    if (!id) {
      throw new Error("Game ID is required");
    }

    const xata = getXataClient();

    try {
      const game = await xata.db.game.read(id);

      if (!game) {
        throw new Error("Game not found");
      }

      await xata.db.game.delete(id);

      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * GET ONE
   */

  async getOne(id: string) {
    if (!id) {
      throw new Error("Game ID is required");
    }

    const xata = getXataClient();

    try {
      const game = await xata.db.game.read(id);

      if (!game) {
        throw new Error("Game not found");
      }

      return game;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
