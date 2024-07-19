import type { EditableData, Identifiable } from "@xata.io/client";
import type { IEnvironment } from "..";
import type { Root } from "../root";
import type { EnvironmentRecord, WorldRecord } from "../xata";

interface IEvent {
  date: string;
  type: string;
  info: string;
}

export interface IWorldModel {
  environment: IEnvironment;
  events: IEvent[];
}

export class WorldController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async create(world: WorldRecord) {
    return await this.root.worldModel.create(world);
  }

  validate(body: unknown) {
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      !("environment" in body)
    ) {
      throw new Error("Invalid body");
    }

    console.log(this.root.columns("world"));

    this.root.columns("world")?.forEach((column) => {
      if (!(column.name in body) && !column.defaultValue) {
        throw new Error(`Missing required field: ${column.name}`);
      }
    });
    return {
      environment: body.environment,
    } as WorldRecord;
  }
}
