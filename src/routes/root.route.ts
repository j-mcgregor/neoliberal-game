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
}
