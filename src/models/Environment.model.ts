import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type DatabaseSchema,
  type EnvironmentRecord,
} from "../xata";

export class EnvironmentModel {
  #envRecord: Repository<EnvironmentRecord>;

  constructor() {
    this.#envRecord = getXataClient().db.environment;
  }

  async create(
    env: Omit<EditableData<EnvironmentRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#envRecord.create({
      celsius_increase: env.celsius_increase,
      deforestation: env.deforestation,
      ocean_biodiversity: env.ocean_biodiversity,
      land_biodiversity: env.land_biodiversity,
      microplastics: env.microplastics,
      sea_level_rise: env.sea_level_rise,
      ozone: env.ozone,
      oil_spills: env.oil_spills,
      natural_disasters: env.natural_disasters,
    });
  }

  migration_create(
    environment: Omit<EditableData<EnvironmentRecord>, "id"> &
      Partial<Identifiable>
  ) {
    const migration: TransactionOperation<DatabaseSchema, "environment"> = {
      insert: {
        table: "environment",
        record: environment,
      },
    };

    return migration;
  }
}
