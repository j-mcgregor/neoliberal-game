import type {
  EditableData,
  Identifiable,
  Repository,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type CompanyFundamentalsRecord,
  type DatabaseSchema,
} from "../xata";

export class CompanyFundamentalsModel {
  #companyFundamentalsRecord: Repository<CompanyFundamentalsRecord>;

  constructor() {
    this.#companyFundamentalsRecord = getXataClient().db.company_fundamentals;
  }

  async create(
    country: Omit<EditableData<CompanyFundamentalsRecord>, "id"> &
      Partial<Identifiable>
  ) {
    return await this.#companyFundamentalsRecord.create(country);
  }

  migration_create(
    company_fundamentals: Omit<EditableData<CompanyFundamentalsRecord>, "id"> &
      Partial<Identifiable>
  ) {
    const migration: TransactionOperation<
      DatabaseSchema,
      "company_fundamentals"
    > = {
      insert: {
        table: "company_fundamentals",
        record: company_fundamentals,
      },
    };

    return migration;
  }
}
