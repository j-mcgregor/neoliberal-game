import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";

export function gameRoutes(app: App, root: Root) {
  app.post("/games/start", async (request) => {
    try {
      const body = await request.json();

      if (!body.company_name || !body.starting_country) {
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
}
