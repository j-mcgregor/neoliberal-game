import type {
  IAction,
  ICompany,
  ICountry,
  IEnvironment,
  IGame,
  IGameEvent,
} from ".";
import { Company } from "./Company";

export class Game implements IGame {
  score_factor = 0.05;
  turn = 0;
  progress = 0;
  company: ICompany;
  environment: IEnvironment;
  game_date: Date;
  starting_country: ICountry;
  conquered_countries: ICountry[] = [];
  events: IGameEvent[] = [];
  actions: IAction[] = [];

  constructor(company: ICompany, country: ICountry) {
    this.company = company;
    this.starting_country = country;
    this.game_date = new Date();

    this.environment = {} as IEnvironment;
  }

  calculateNewFinancials(): ICompany["financials"] {
    return {
      ...Company.default_financials,
      valuation: (this.company.financials.valuation += 100),
    };
  }

  playTurn() {
    this.turn++;

    // update company's balance sheet
    this.company.financials = this.calculateNewFinancials();

    // somehow need to increase the score
    this.company.score += this.score_factor;

    // update the score factor
    this.updateScoreFactor();

    return null;
  }

  dispatchAction(action: IAction) {
    this.actions.push(action);
  }

  updateScoreFactor() {
    /**
     * in here we would take all the other contributing factors
     * and whittle them down into a single number between -1 & 1.
     * That number is then multiplied by the company's valuation
     */
    this.score_factor *= 0.04;
  }

  /**
   * Game class stores itself as a JSON class
   */

  toJSON() {
    return JSON.stringify({
      company: this.company,
      environment: this.environment,
      game_date: this.game_date,
      starting_country: this.starting_country,
      conquered_countries: this.conquered_countries,
      events: this.events,
      actions: this.actions,
    });
  }

  fromJSON(json: string) {
    const obj = JSON.parse(json);

    this.company = obj.company;
    this.environment = obj.environment;
    this.game_date = obj.game_date;
    this.starting_country = obj.starting_country;
    this.conquered_countries = obj.conquered_countries;
    this.events = obj.events;
    this.actions = obj.actions;

    return this;
  }
}
