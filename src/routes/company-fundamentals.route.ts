import { App } from "@j-mcgregor/bun-express";
import { Root } from "../root";
import { ActionTypeEnum } from "../../types/enums";

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
      if (!(body.action.type in ActionTypeEnum)) {
        return Response.json(
          {
            message: "Invalid action type",
          },
          {
            status: 400,
          }
        );
      }

      const companyFundamentalsController = root.getController(
        "CompanyFundamentalsController"
      );

      try {
        const action = await companyFundamentalsController?.update(
          id,
          body.action
        );

        return Response.json({ action });
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "errors" in error &&
          Array.isArray(error.errors)
        ) {
          return Response.json(
            {
              message: error.errors,
            },
            {
              status: 400,
            }
          );
        }

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

  app.post(
    "/company-fundamentals/:id/select-tech",
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

      const companyFundamentalsController = root.getController(
        "CompanyFundamentalsController"
      );

      try {
        const action = await companyFundamentalsController?.selectTechnology(
          id,
          body.technology
        );

        return Response.json({ action });
      } catch (error) {
        if (
          typeof error === "object" &&
          error &&
          "errors" in error &&
          Array.isArray(error.errors)
        ) {
          return Response.json(
            {
              message: error.errors,
            },
            {
              status: 400,
            }
          );
        }

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
