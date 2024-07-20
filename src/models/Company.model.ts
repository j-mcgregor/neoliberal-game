import type { EditableData, Identifiable, Repository } from "@xata.io/client";
import { getXataClient, type CompanyRecord } from "../xata";

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
}
