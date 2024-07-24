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
import type { Root } from "../root";

export class EnvironmentModel {
  #envRecord: Repository<EnvironmentRecord>;
  root: Root;

  constructor(_root: Root) {
    this.root = _root;
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

  async turn(id: string, factor: number) {
    const columns = this.root.columns<keyof EnvironmentRecord>("environment");
    const economy = await this.#envRecord.getFirst({
      filter: { id },
    });

    if (!economy) {
      throw new Error(`Economy with id ${id} not found`);
    }

    const fields = Object.entries(economy).reduce((acc, [key, value]) => {
      const bump = this.root.calculateFactor(factor);
      const column = columns?.find((column) => column.name === key);

      if (typeof value !== "number") {
        return acc;
      }

      switch (column?.name) {
        // columns that decrease. These all begin at 100%
        // ozone at 50% is game over
        // deforestation at 20% is game over
        // ocean_biodiversity at 40% is game over
        // land_biodiversity at 40% is game over
        case "deforestation":
        case "ocean_biodiversity":
        case "land_biodiversity":
        case "ozone":
          return {
            ...acc,
            [key]: Number((value - bump / 8).toFixed(3)),
          };
        // sea level rise and celsius increase are the same
        // celsius increase is MAX 5 is game over
        // sea level rise is MAX 20 is game over
        case "celsius_increase":
        case "sea_level_rise":
          return {
            ...acc,
            [key]: Number((value + bump / 100).toFixed(3)),
          };
        // microplastics at 2000 is game over
        // microplastics is only Int
        case "microplastics":
          return {
            ...acc,
            [key]: Math.ceil(value + bump * Math.ceil(Math.random() * 5)),
          };
        default:
          return acc;
      }
    }, {} as Omit<EditableData<EnvironmentRecord>, "id"> & Partial<Identifiable>);

    const migration: TransactionOperation<DatabaseSchema, "environment"> = {
      update: {
        table: "environment",
        id,
        fields,
      },
    };

    return migration;
  }
}
