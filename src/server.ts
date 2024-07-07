import { GamesController } from "./controllers/games.controller";
import { App } from "@j-mcgregor/bun-express";

const app = new App({
  port: 8080,
  hostname: "localhost",
  prefix: "/api",
});

// game
app.post("/games/start", async (request, server, params) => {
  console.log("params :>> ", params);
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

  const controller = new GamesController();
  const game = controller.createGame({
    company,
    country,
  });

  return Response.json({
    game: JSON.parse(game.toJSON()),
  });
});

// print all routes

app.printRoutes();

app.serve();
