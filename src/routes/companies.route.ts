import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";
import { ActionTypeEnum } from "..";

export function companyRoutes(app: App, root: Root) {
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
}
