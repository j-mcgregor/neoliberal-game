import type { EditableData, Identifiable } from "@xata.io/client";
import type { Root } from "../root";
import type { EconomyRecord } from "../xata";

export class EconomyController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(
    world: Omit<EditableData<EconomyRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.root.economyModel.create(world);
  }

  async turn(id: string) {
    const game = await this.root.model.db.game
      .select(["score_factor"])
      .getFirst({
        filter: {
          world: {
            economy: id,
          },
        },
      });

    if (!game?.score_factor) {
      throw new Error(`Game with could not be found`);
    }

    const migration = await this.root.economyModel.turn(id, game.score_factor);

    return await this.root.migrations_run([migration]);
  }
}
