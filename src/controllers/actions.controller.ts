import { ActionTypeEnum } from "..";
import { type CompanyRecord } from "../xata";
import { Root } from "../root";

export interface GameAction {
  type: ActionTypeEnum;
  company: CompanyRecord["id"];
  data: Record<string, any>;
}

export class ActionsController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async createAction() {}
  async updateAction() {}
  async deleteAction() {}
  async getAction() {}

  async turnAction(action: GameAction) {
    // return await this.model.db.action.create(action);
    return this.root.actionModel.create(action);
  }
}
