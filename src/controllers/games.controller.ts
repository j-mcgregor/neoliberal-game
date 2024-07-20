import type { EnvironmentRecord } from "../xata";
import type { Root } from "../root";

export class GamesController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(game: {
    starting_country: string;
    company_name: string;
    environment?: Partial<EnvironmentRecord>;
  }) {
    // Country
    const countryModel = this.root.getModel("CountryModel");
    const country = await countryModel?.create({ name: game.starting_country });

    // Company
    const companyModel = this.root.getModel("CompanyModel");
    const company = await companyModel?.create({ name: game.company_name });

    // Environment
    const environmentModel = this.root.getModel("EnvironmentModel");
    const environment = await environmentModel?.create({
      natural_disasters: game.environment?.natural_disasters ?? [],
      oil_spills: game.environment?.oil_spills ?? [],
    });

    // World
    const worldModel = this.root.getModel("WorldModel");
    const world = await worldModel?.create({
      environment,
    });

    const gameModel = this.root.getModel("GameModel");
    return await gameModel?.create(game);
  }
}

// export class _GamesController {
//   protected model: GameModel;

//   constructor() {
//     this.model = new GameModel();
//   }

//   isValid(value: unknown): value is GameRecord {
//     return typeof value === "object" && value !== null;
//   }

//   makeGame(game: unknown): Partial<EditableData<GameRecord>> & Identifiable {
//     if (typeof game !== "object") {
//       throw new Error("Game must be an object");
//     }

//     const newBody = {} as Partial<EditableData<GameRecord>> & Identifiable;

//     if (this.isValid(game)) {
//       if (game.company) {
//         newBody.company = game.company;
//       }

//       if (game.progress) {
//         newBody.progress = game.progress;
//       }

//       if (game.score_factor) {
//         newBody.score_factor = game.score_factor;
//       }

//       if (game.starting_country) {
//         newBody.starting_country = game.starting_country;
//       }

//       if (game.turn) {
//         newBody.turn = game.turn;
//       }

//       return newBody as Partial<EditableData<GameRecord>> & Identifiable;
//     }

//     throw new Error("Game is not valid");
//   }

//   async update(id: any, body: unknown) {
//     if (!id || !body) {
//       throw new Error("Game ID and body are required");
//     }

//     try {
//       const args = this.makeGame(body);

//       const game = await this.model.update(args);

//       return game;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }

//   async createGame(data: {
//     company: Pick<ICompany, "name">;
//     country: Pick<ICountry, "name">;
//     world: string;
//   }) {
//     const country = new Country(data.country.name);
//     const company = new Company(data.company.name, country);

//     try {
//       console.log("data.world :>> ", data.world);
//       const game = await GameModel.init(country, company, data.world);

//       return game;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }

//   async deleteGame(id: string) {
//     if (!id) {
//       throw new Error("Game ID is required");
//     }

//     try {
//       await this.model.delete(id);

//       return true;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }

//   async playRound(id?: string) {
//     if (!id) {
//       throw new Error("Game ID is required");
//     }

//     try {
//       const game = await this.model.playRound({ id });

//       return game;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }

//   /**
//    * GET GAME
//    */
//   async getGame(id: string) {
//     if (!id) {
//       throw new Error("Game ID is required");
//     }

//     try {
//       const game = await this.model.getOne(id);
//       return game;
//     } catch (error) {
//       throw new Error(String(error));
//     }
//   }
// }
