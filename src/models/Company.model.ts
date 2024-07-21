import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type CompanyRecord,
  type DatabaseSchema,
} from "../xata";

export class CompanyModel {
  #companyRecord: Repository<CompanyRecord>;

  constructor() {
    this.#companyRecord = getXataClient().db.company;
  }

  async create(
    country: Omit<EditableData<CompanyRecord>, "id"> & Partial<Identifiable>
  ) {
    return await this.#companyRecord.create(country);
  }

  migration_create(
    company: Omit<EditableData<CompanyRecord>, "id"> & Partial<Identifiable>
  ) {
    const migration: TransactionOperation<DatabaseSchema, "company"> = {
      insert: {
        table: "company",
        record: company,
      },
    };

    return migration;
  }
}
