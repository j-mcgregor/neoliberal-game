import type { Repository } from "@xata.io/client";
import type { GameAction } from "../controllers/actions.controller";
import { getXataClient, type ActionRecord } from "../xata";

export class ActionModel {
  #actionRecord: Repository<ActionRecord>;

  constructor() {
    this.#actionRecord = getXataClient().db.action;
  }

  async create(action: GameAction) {
    return await this.#actionRecord.create({
      type: action.type,
      company: action.company,
      data: JSON.stringify(action.data),
    });
  }
}
