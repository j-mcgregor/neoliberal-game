import type { ICompany, ICountry, IGame } from "..";
import { Company } from "../Company";
import { Country } from "../Country";
import { Game } from "../Game";

export class GamesController {
  private games: IGame[] = [];

  constructor() {
    this.games = [];
  }

  createGame(data: {
    company: Pick<ICompany, "name">;
    country: Pick<ICountry, "name">;
  }) {
    const country = new Country(data.country.name);
    const company = new Company(data.company.name, country);

    const game = new Game(company, country);
    this.games.push(game);
    return game;
  }
}
