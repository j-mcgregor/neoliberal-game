import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";

export function environmentRoutes(app: App, root: Root) {
  app.put("/environment/:id", async (request, server, params) => {
    try {
      const environment = await root.environmentController.turn(params?.id);

      return Response.json({ environment });
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
