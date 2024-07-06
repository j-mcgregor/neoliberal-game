import { describe, it, expect } from "bun:test";
import { Country } from "../Country";
import { ActionTypeEnum, CompanyTypeEnum, PoliticalPersuasionEnum } from "..";
import { Game } from "../Game";
import { Company } from "../Company";

describe("Country", () => {
  it("create a country with default options", () => {
    const USA = new Country("USA");

    expect(USA.name).toBe("USA");
    expect(USA.gdp).toBe(0);
    expect(USA.influence).toBe(0);
    expect(USA.politics).toEqual({
      name: "Center",
      persuasion: PoliticalPersuasionEnum.CENTER,
    });
  });

  it("create a country with custom options", () => {
    const USA = new Country("USA", {
      gdp: 100,
      influence: 50,
      starting_difficulty: "easy",
      politics: {
        name: "Greens",
        persuasion: PoliticalPersuasionEnum.FAR_LEFT,
      },
    });

    expect(USA.name).toBe("USA");
    expect(USA.gdp).toBe(100);
    expect(USA.influence).toBe(50);
    expect(USA.politics).toEqual({
      name: "Greens",
      persuasion: PoliticalPersuasionEnum.FAR_LEFT,
    });
  });
});

describe("Company", () => {
  it("create a company with default options", () => {
    const country = new Country("USA");
    const company = new Company("Manyana", country);

    expect(company.name).toBe("Manyana");
    expect(company.company_type).toBe(CompanyTypeEnum.MANUFACTURING);
    expect(company.countries).toEqual([country]);
    expect(company.products).toEqual([]);
    expect(company.score).toBe(0);
    expect(company.financials).toEqual(Company.default_financials);
  });

  it("create a company with custom options", () => {
    const country = new Country("USA");
    const company = new Company("Manyana", country, {
      company_type: CompanyTypeEnum.BANKING,
      countries: [country],
      financials: {
        market_cap: 1000,
        net_loss: 1000,
        net_revenue: 1000,
        share_price: 1000,
        tax_annual: 1000,
        valuation: 1000,
      },
      products: [],
      score: 100,
    });

    expect(company.name).toBe("Manyana");
    expect(company.company_type).toBe(CompanyTypeEnum.BANKING);
    expect(company.countries[0].name).toBe("USA");
    expect(company.score).toBe(100);
  });
});

describe("Game", () => {
  it("should create a game", () => {
    const country = new Country("USA");
    const company = new Company("Acme Corp", country);
    const game = new Game(company, country);

    expect(game.company.name).toBe("Acme Corp");
    expect(game.starting_country.name).toBe("USA");
  });

  it("should increment the turn counter on `playTurn()`", () => {
    const country = new Country("USA");
    const company = new Company("Acme Corp", country);
    const game = new Game(company, country);

    expect(game.turn).toBe(0);
    game.playTurn();
    expect(game.turn).toBe(1);
    game.playTurn();
    expect(game.turn).toBe(2);
  });

  it("should trigger and store actions", () => {
    const country = new Country("USA");
    const company = new Company("Acme Corp", country);
    const game = new Game(company, country);

    expect(game.actions.length).toBe(0);
    game.dispatchAction({ type: ActionTypeEnum.MARKETING });
    expect(game.actions.length).toBe(1);
    game.dispatchAction({ type: ActionTypeEnum.ASSASSINATION });
    expect(game.actions.length).toBe(2);

    expect(game.actions).toEqual([
      { type: ActionTypeEnum.MARKETING },
      { type: ActionTypeEnum.ASSASSINATION },
    ]);
  });
});
