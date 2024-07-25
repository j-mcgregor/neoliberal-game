import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";
import { ActionTypeEnum } from "..";

export function companyFundamentalsRoutes(app: App, root: Root) {
  /**
   * A player can have multiple company actions per turn
   * eg buy, sell, invest, etc.
   * Each action type corresponds to a different action.
   */
  app.post(
    "/company-fundamentals/:id/actions",
    async (request, server, params) => {
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
        const action = await companyController?.turnAction(body.action);

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
    }
  );
}
