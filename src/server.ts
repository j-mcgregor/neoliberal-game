import { GamesController } from "./controllers/games.controller";
import { App } from "./app";

const app = new App({
  port: 8080,
  hostname: "localhost",
  prefix: "/api",
});

// game
app.post("/games/start", async (request, server) => {
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
app.routes.forEach((routes, method) => {
  routes.forEach((handler, route) => {
    console.log(`${method} ${route}`);
  });
});

app.serve();
