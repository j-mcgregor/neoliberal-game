import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";
import type { WorldRecord } from "../xata";

export function worldRoutes(app: App, root: Root) {
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
}
