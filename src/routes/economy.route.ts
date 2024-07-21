import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";

export function economyRoutes(app: App, root: Root) {
  app.put("/economy/:id", async (request, server, params) => {
    try {
      const economy = await root.economyController.turn(params?.id);

      return Response.json({ economy });
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
}
