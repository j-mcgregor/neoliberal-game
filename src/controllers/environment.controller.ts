import type { EditableData, Identifiable } from "@xata.io/client";
import type { Root } from "../root";
import type { EnvironmentRecord } from "../xata";

export class EnvironmentController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(
    env: Omit<EditableData<EnvironmentRecord>, "id"> & Partial<Identifiable>
  ) {
    const envModel = this.root.getModel("EnvironmentModel");
    return await envModel?.create(env);
  }

  validate(body: unknown) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Invalid body");
    }

    this.root.columns("environment")?.forEach((column) => {
      if (!(column.name in body) && !column.defaultValue) {
        throw new Error(`Missing required field: ${column.name}`);
      }
    });

    return body as EnvironmentRecord;
  }

  async turn(id: string) {
    const game = await this.root.model.db.game
      .select(["score_factor"])
      .getFirst({
        filter: {
          world: {
            environment: id,
          },
        },
      });

    /**
     * @todo Environment shouldn't use score_factor eventually
     */
    if (!game?.score_factor) {
      throw new Error(`Game with could not be found`);
    }

    const migration = await this.root.environmentModel.turn(
      id,
      game.score_factor
    );

    return await this.root.migrations_run([migration]);
  }
}
