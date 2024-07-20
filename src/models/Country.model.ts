import type { EditableData, Identifiable, Repository } from "@xata.io/client";
import { getXataClient, type CountryRecord } from "../xata";

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
}
