import { App } from "@j-mcgregor/bun-express";

import { ActionTypeEnum } from ".";
import { Root } from "./root";
import { ActionsController } from "./controllers/actions.controller";
import { CompaniesController } from "./controllers/companies.controller";
import { ActionModel } from "./models/Action.model";
import { CompanyModel } from "./models/Company.model";
import { WorldController } from "./controllers/world.controller";
import { EnvironmentController } from "./controllers/environment.controller";
import { WorldModel } from "./models/World.model";
import { EnvironmentModel } from "./models/Environment.model";
import type { WorldRecord } from "./xata";
import { GamesController } from "./controllers/games.controller";
import { GameModel } from "./models/Game.model";
import { CountriesController } from "./controllers/countries.controller";
import { CountryModel } from "./models/Country.model";

const app = new App({
  port: 8080,
  hostname: "localhost",
  prefix: "/api",
});

const root = new Root({
  models: [
    WorldModel,
    EnvironmentModel,
    ActionModel,
    CompanyModel,
    CountryModel,
    GameModel,
  ],
  controllers: [
    WorldController,
    EnvironmentController,
    ActionsController,
    CompaniesController,
    CountriesController,
    GamesController,
  ],
});

// game
app.post("/games/start", async (request, server, params) => {
  try {
    const body = await request.json();

    if (!body.company || !body.country) {
      return Response.json(
        {
          message: "Company and country are required",
        },
        {
          status: 400,
        }
      );
    }

    const game = await root.gameController?.create(body);

    return Response.json(game);
  } catch (error) {
    return Response.json(
      {
        message: String(error),
      },
      {
        status: 500,
      }
    );
  }
});

app.put("/games/:id", async (request, server, params) => {
  const body = await request.json();
  const id = params?.id;

  if (!id) {
    return Response.json(
      {
        message: "Game ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const gameController = root.getController("GamesController");

  const game = await gameController?.update(id, body);

  return Response.json(game);
});

app.post("/companies/:id/actions", async (request, server, params) => {
  const body = await request.json();
  const id = params?.id;

  if (!id) {
    return Response.json(
      {
        message: "Game ID is required",
      },
      {
        status: 400,
      }
    );
  }

  if (!(body.type in ActionTypeEnum)) {
    return Response.json(
      {
        message: "Invalid action type",
      },
      {
        status: 400,
      }
    );
  }

  const companyController = root.getController("CompaniesController");

  try {
    const action = await companyController?.turnAction({
      company: id,
      data: body.data,
      type: body.type,
    });

    return Response.json({ action });
  } catch (error) {
    return Response.json(
      {
        message: String(error),
      },
      {
        status: 500,
      }
    );
  }
});

app.post("/world", async (request, server, params) => {
  const body = await request.json();

  try {
    const _world = root.worldController.validate(body);
    const _env = root.environmentController.validate(_world.environment);

    const env = await root.environmentController.create(_env);
    const world = await root.worldController.create({
      environment: env,
    } as WorldRecord);

    return Response.json({ world });
  } catch (error) {
    return Response.json(
      {
        message: String(error),
      },
      {
        status: 500,
      }
    );
  }
});

// print all routes

app.printRoutes();

app.serve();
