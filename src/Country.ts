import { PoliticalPersuasionEnum } from ".";

import type { ICountry, IPolitics } from ".";

export class Country implements ICountry {
  gdp: number;
  influence: number;
  name: string;
  politics: IPolitics;
  starting_difficulty: ICountry["starting_difficulty"];

  constructor(
    name: string,
    options: Omit<ICountry, "name"> = {
      starting_difficulty: "normal",
      gdp: 0,
      politics: {
        name: "Center",
        persuasion: PoliticalPersuasionEnum.CENTER,
      },
      influence: 0,
    }
  ) {
    if (!name) {
      throw new Error("Country name is required");
    }
    this.name = name;
    // default options than can be overridden
    this.gdp = options.gdp;
    this.influence = options.influence;
    this.politics = options.politics;
    this.starting_difficulty = options.starting_difficulty;
  }
}
