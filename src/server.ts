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

const app = new App({
  port: 8080,
  hostname: "localhost",
  prefix: "/api",
});

const root = new Root({
  models: [WorldModel, EnvironmentModel, ActionModel, CompanyModel],
  controllers: [
    WorldController,
    EnvironmentController,
    ActionsController,
    CompaniesController,
  ],
});

// game
app.post("/games/start", async (request, server, params) => {
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

  const company = body.company;
  const country = body.country;

  const gameController = root.getController("GamesController");

  const game = await gameController?.createGame({
    company,
    country,
  });

  return Response.json(game);
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

console.log(root);

app.serve();

try {
  root.environmentController.validate({
    // celsius_increase: 0,
    // deforestation: 0,
    // ocean_biodiversity: 0,
    // land_biodiversity: 0,
    // sea_level_rise: 0,
    // ozone: 0,
    // microplastics: 0,
    oil_spills: 0,
    natural_disasters: 0,
  });
} catch (error) {
  console.log(error);
}
