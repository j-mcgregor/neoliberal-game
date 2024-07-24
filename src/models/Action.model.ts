import type { Repository } from "@xata.io/client";
import type { GameAction } from "../controllers/actions.controller";
import { getXataClient, type ActionRecord } from "../xata";
import type { createAction } from "../lib/actions/create-action";

export class ActionModel {
  #actionRecord: Repository<ActionRecord>;

  constructor() {
    this.#actionRecord = getXataClient().db.action;
  }

  async create(action: ReturnType<typeof createAction>) {
    return await this.#actionRecord.create(action);
  }
}
