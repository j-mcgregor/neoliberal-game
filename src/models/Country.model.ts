import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type CountryRecord,
  type DatabaseSchema,
} from "../xata";

export class CountryModel {
  #countryRecord: Repository<CountryRecord>;

  constructor() {
    this.#countryRecord = getXataClient().db.country;
  }

  async create(
    country: Omit<EditableData<CountryRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#countryRecord.create(country);
  }

  migration_create(
    country: Omit<EditableData<CountryRecord>, "id"> & Partial<Identifiable>
  ) {
    const migration: TransactionOperation<DatabaseSchema, "country"> = {
      insert: {
        table: "country",
        record: country,
      },
    };

    return migration;
  }
}
