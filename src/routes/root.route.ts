import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";

export function rootRoutes(app: App, root: Root) {
  app.delete("/drop-db", async (request, server, params) => {
    try {
      const environment = await root.dropDatabase();

      return Response.json({ environment });
    } catch (error) {
      return Response.json({ message: String(error) }, { status: 500 });
    }
  });

  app.post("/reset", async (request, server, params) => {
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

      const game = await root.reset(body);

      return Response.json({ game });
    } catch (error) {
      return Response.json({ message: String(error) }, { status: 500 });
    }
  });
}
