import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import { getXataClient, type DatabaseSchema, type WorldRecord } from "../xata";

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

  migration_create(
    world: Omit<EditableData<WorldRecord>, "id"> & Partial<Identifiable>
  ) {
    console.log("world :>> ", world);
    const migration: TransactionOperation<DatabaseSchema, "world"> = {
      insert: {
        table: "world",
        record: world,
      },
    };

    return migration;
  }
}
