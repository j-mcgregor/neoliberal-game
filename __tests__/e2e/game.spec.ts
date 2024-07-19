import type { TransactionOperation } from "@xata.io/client";
import { GamesController } from "../../src/controllers/games.controller";
import { XataClient, type DatabaseSchema } from "../../src/xata";
import { describe, expect, it, beforeAll, afterAll } from "bun:test";

const xata = new XataClient({
  branch: "test",
});

async function setup() {
  const country = {
    name: "USA",
    gdp: 1000000,
  };
  const company = {
    name: "ACME Inc",
    company_type: "manufacturing",
  };

  const g = new GamesController();
  const game = await g.createGame({
    company,
    country,
  });

  return game;
}

async function teardown() {
  const companyIds = await xata.db.company.select(["id"]).getAll();
  const countryIds = await xata.db.country.select(["id"]).getAll();
  const gameIds = await xata.db.game.select(["id"]).getAll();

  const gameTransactions: TransactionOperation<DatabaseSchema, "game">[] =
    gameIds.map(({ id }) => ({
      delete: { table: "game", id },
    }));

  const companyTransactions: TransactionOperation<DatabaseSchema, "company">[] =
    companyIds.map(({ id }) => ({
      delete: { table: "company", id },
    }));

  const countryTransactions: TransactionOperation<DatabaseSchema, "country">[] =
    countryIds.map(({ id }) => ({
      delete: { table: "country", id },
    }));

  await xata.transactions.run([
    ...gameTransactions,
    ...companyTransactions,
    ...countryTransactions,
  ]);
}

beforeAll(async () => {
  await teardown();
});

// afterAll(async () => {
//   await teardown();
// });

describe("init a game", () => {
  it("should create a game", async () => {
    const game = await setup();

    const company = await game?.company?.read();
    const country = await game?.starting_country?.read();
    const companyCountry = await company?.starting_country?.read();

    expect(company?.name).toBe("ACME Inc");
    expect(country?.name).toBe("USA");

    if (country?.name) {
      expect(companyCountry?.name).toBe(country.name);
    }

    expect(game).toBeDefined();
    expect(game?.turn).toBe(0);
    expect(game?.progress).toBe(0);
  });

  it("should increase the turn when you play a round", async () => {
    const g = new GamesController();

    const game = await setup();

    if (!game?.id) {
      throw new Error("Game ID is required");
    }

    expect(game).toBeDefined();
    expect(game?.turn).toBe(0);
    expect(game?.progress).toBe(0);

    await g.playRound(game?.id);

    let updatedGame = await g.getGame(game.id);

    expect(updatedGame?.turn).toBe(1);
    expect(updatedGame?.progress).toBe(1);

    await g.playRound(game?.id);

    updatedGame = await g.getGame(game.id);

    expect(updatedGame?.turn).toBe(2);
    expect(updatedGame?.progress).toBe(2);
  });
});
