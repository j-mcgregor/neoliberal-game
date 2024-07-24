import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type DatabaseSchema,
  type EconomyRecord,
} from "../xata";
import type { Root } from "../root";

export class EconomyModel {
  #economyRecord: Repository<EconomyRecord>;
  root: Root;

  constructor(_root: Root) {
    this.root = _root;
    this.#economyRecord = getXataClient().db.economy;
  }

  async create(
    economy: Omit<EditableData<EconomyRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#economyRecord.create(economy);
  }

  migration_create(
    economy: Omit<EditableData<EconomyRecord>, "id"> & Partial<Identifiable>
  ) {
    console.log("economy :>> ", economy);
    const migration: TransactionOperation<DatabaseSchema, "economy"> = {
      insert: {
        table: "economy",
        record: economy,
      },
    };

    return migration;
  }

  async turn(id: string, factor: number) {
    const columns = this.root.columns("economy");
    const economy = await this.#economyRecord.getFirst({
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

      if (column?.type === "int") {
        return {
          ...acc,
          [key]: Math.floor(value * bump),
        };
      }

      return {
        ...acc,
        [key]: Number((value * bump).toFixed(3)),
      };
    }, {} as Omit<EditableData<EconomyRecord>, "id"> & Partial<Identifiable>);

    const migration: TransactionOperation<DatabaseSchema, "economy"> = {
      update: {
        table: "economy",
        id,
        fields,
      },
    };

    return migration;
  }
}
