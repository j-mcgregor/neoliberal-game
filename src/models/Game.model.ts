import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import { getXataClient, type DatabaseSchema, type GameRecord } from "../xata";

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

  migration_create(
    game: Omit<EditableData<GameRecord>, "id"> & Partial<Identifiable>
  ) {
    const migration: TransactionOperation<DatabaseSchema, "game"> = {
      insert: {
        table: "game",
        record: game,
      },
    };

    return migration;
  }

  async migrations_run(
    migrations: TransactionOperation<DatabaseSchema, keyof DatabaseSchema>[]
  ) {
    return await getXataClient().transactions.run(migrations);
  }

  async getFactor(id: string, score_factor: number) {
    const game = await this.#gameRecord.select(["score_factor"]).getFirst({
      filter: { id },
    });

    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }

    return game.score_factor;
  }
}
