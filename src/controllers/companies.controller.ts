/**
 * The Company is the defining class for the game. It contains all the information about the company, including its name, type, countries, financials, products, and score.
 *
 * It will have methods for updating the company's financials, products, and score.
 */

import { ActionTypeEnum } from "..";
import { loggedMethod } from "../decorators/action.decorator";
import type { GameAction } from "./actions.controller";
import { Root } from "../root";

export class CompaniesController {
  root: Root;
  constructor(_root: Root) {
    this.root = _root;
  }

  async createCompany() {}
  async updateCompany() {}
  async deleteCompany() {}
  async getCompany() {}
  /**
   * Can play multiple actions in a turn.
   * Each action logs a game event.
   */
  @loggedMethod
  async turnAction(action: GameAction) {
    return await this.root.actionController?.turnAction(action);
  }
}
