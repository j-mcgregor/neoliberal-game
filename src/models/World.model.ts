import type { EditableData, Identifiable, Repository } from "@xata.io/client";
import { getXataClient, type WorldRecord } from "../xata";

export class WorldModel {
  #worldRecord: Repository<WorldRecord>;

  constructor() {
    this.#worldRecord = getXataClient().db.world;
  }

  async create(
    world: Omit<EditableData<WorldRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#worldRecord.create({
      environment: world.environment,
    });
  }
}
