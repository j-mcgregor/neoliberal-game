import type { EditableData, Identifiable } from "@xata.io/client";
import type { Root } from "../root";
import type { EnvironmentRecord } from "../xata";

export class EnvironmentController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(
    env: Omit<EditableData<EnvironmentRecord>, "id"> & Partial<Identifiable>
  ) {
    const envModel = this.root.getModel("EnvironmentModel");
    return await envModel?.create(env);
  }

  validate(body: unknown) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("Invalid body");
    }

    this.root.columns("environment")?.forEach((column) => {
      if (!(column.name in body) && !column.defaultValue) {
        throw new Error(`Missing required field: ${column.name}`);
      }
    });

    return body as EnvironmentRecord;
  }
}
