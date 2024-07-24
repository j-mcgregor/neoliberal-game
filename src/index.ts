/*
 * -------------------------------
 * COMPANY
 * -------------------------------
 */

export interface ICompany {
  name: string;
  starting_country: ICountry;
  company_type: CompanyTypeEnum;
  score: number;
  financials: {
    net_revenue: number;
    net_loss: number;
    tax_annual: number;
    // private
    valuation: number;
    // public
    share_price: number;
    market_cap: number;
  };
  countries: ICountry[];
  products: IProduct[];
}

export enum CompanyTypeEnum {
  // start with these for now
  MANUFACTURING = "manufacturing",
  AUTOMOTIVE = "automotive",
  // -----
  PETROCHEMICAL = "petrochemical",
  AEROSPACE = "aerospace",
  TELECOMS = "telecoms",
  BANKING = "banking",
}

/*
 * -------------------------------
 * PRODUCT
 * -------------------------------
 */

export interface IProduct {
  name: string;
  // what they sell for
  price: number;
  // cost to develop
  cost: number;
  units_sold: number;
}

/*
 * -------------------------------
 * COUNTRY
 * -------------------------------
 */

export interface ICountry {
  name: string;
  gdp: number;
  politics: IPolitics;
  // 0 - 100% - at 100%, any proposal selected will go through, eg deregulation
  // At 100%, a country is 'conquered'
  influence: number;
  starting_difficulty: "easy" | "normal" | "hard" | "real world";
}

/*
 * -------------------------------
 * PUBLIC OPINION
 * -------------------------------
 */

export interface IPublicOpinion {
  // eg assassinating a journalist before they expose you will keep the score steady
  // eg an exposed assassination will heavily penalize your score
  assassinations: IAssassination[];
  // eg a well-placed bribe can make the public forget about something
  bribes: IBribe[];
  environment: IEnvironment;
}

/*
 * -------------------------------
 * ASSASSINATION
 * -------------------------------
 */

export enum AssassinationEnum {
  POLITICAL = "political",
  CORPORATE = "corporate",
  WHISTLEBLOWER = "whistleblower",
}

export interface IAssassination {
  type: AssassinationEnum;
  target: string;
  amount: number;
  score: number;
  date: string;
  success: boolean;
  exposed: boolean;
  info: string;
}

/*
 * -------------------------------
 * ASSASSINATION
 * -------------------------------
 */

export enum BribeTypeEnum {
  POLITICAL = "political",
  CORPORATE = "corporate",
}

export interface IBribe {
  type: BribeTypeEnum;
  target: string;
  amount: number;
  score: number;
  date: string;
  success: boolean;
  exposed: boolean;
  info: string;
}

/*
 * -------------------------------
 * ENVIRONMENT
 * -------------------------------
 */

export interface IEnvironment {
  celsius_increase: number; // degrees above pre-industrial average - as it rises the
  deforestation: number; // 0 - 100%
  ocean_biodiversity: number; // starts at 100 and goes down
  land_biodiversity: number; // starts at 100 and goes down
  sea_level_rise: number; // 0 - 10m
  oil_spills: IOilSpill[];
  ozone: number; // 0 - 100% - at 10%, it accelerates land_biodiversity
  microplastics: number; // parts per million - it accelerates ocean_biodiversity
  natural_disasters: INaturalDisaster[];
}

export interface IOilSpill {
  location: string;
  damage: number;
  exposed: true;
}

export interface INaturalDisaster {
  type: NaturalDisasterTypeEnum;
  damage: number;
  date: Date;
}

export enum NaturalDisasterTypeEnum {
  EARTHQUAKE = "earthquake",
  VOLCANO = "volcano",
  TSUNAMI = "tsunami",
  TORNADO = "tornado",
  WILDFIRE = "wildfire",
  HURRICANE = "hurricane",
  FLOODING = "flooding",
  HEATWAVE = "heatwave",
  POLAR_VORTEX = "polar vortex",
  DOUGHT = "drought",
}

/*
 * -------------------------------
 * POLITICS
 * -------------------------------
 */

export interface IPolitics {
  name: string;
  persuasion: PoliticalPersuasionEnum;
}

export enum PoliticalPersuasionEnum {
  FAR_LEFT = "far left",
  LEFT = "left",
  CENTER_LEFT = "center left",
  CENTER = "center",
  CENTER_RIGHT = "center right",
  RIGHT = "right",
  FAR_RIGHT = "far right",
}

/*
 * -------------------------------
 * GAME
 * -------------------------------
 */

export interface IGame {
  // a number between -1 and 1 that's used to determine
  // the growth of the company. It should be made by adding
  // various economic and game state factors together then
  // calculating the value to be between -1 and 1
  score_factor: number;
  company: ICompany;
  starting_country: ICountry;
  conquered_countries: ICountry[];
  progress: number;
  game_date: Date;
  turn: number;
  environment: IEnvironment;
  events: IGameEvent[];
  actions: IAction[];
}

export interface IGameEvent {
  type: EventTypeEnum;
  score_impact: number;
  environmental_impact: number;
}

export enum EventTypeEnum {
  // normally a precursor to an investigation
  SCANDAL = "scandal",
  // can be made to go away with a bribe
  INVESTIGATION = "investigation",
  // useful when it works
  BRIBE = "bribe",
  // useful when a bribe fails and for stopping a scandal
  ASSASSINATION = "assassination",
  // whistleblowers have the potential to cripple you
  WHISTLEBLOWER = "whistleblower",
  // consistent updates on the state of the world from the public's point of view
  NEWS = "news",
  // happens every financial milestone / acquisition
  GROWTH = "growth",
  // cannot be an action, rather the result of many actions
  CONQUER = "conquer",
}

/*
 * -------------------------------
 * SCIENCE
 * - both good and bad
 * 	-- 	good science is something for the environment
 *		like fission research, CO2 removal, micro plastic
 *		research etc
 * 	--	bad science is for stuff you make products from
 * 		that causes more mining / emissions / plastic
 * 		pollution that harms the environment
 * - the more damage you do, the more push-back and good research funding
 * - it starts slow but can really gather momentum
 * -------------------------------
 */

export interface IScience {
  score: number;
  type: "environment" | "corporate";
}

/*
 * --------------------------------------------------------------
 * GAME PLAY
 * - turn based is the simplest for now, like Civ
 * - user selects country to start in: countries have difficulty level
 * - company starts off with 10k in revenue
 * - each round, the user can choose what they want to do with the money
 * - at first, the list of options are small but new options are unlocked as the game progresses
 * --------------------------------------------------------------
 */

// the Action could actually be sent in a reducer pattern like Redux
export interface IAction {
  type: ActionTypeEnum;
  data?: unknown;
}

export enum ActionTypeEnum {
  TURN = "turn",
  // legal
  RESEARCH = "research",
  INVEST = "invest",
  ACQUIRE = "acquire",
  // expand into another country
  EXPAND = "expand",
  MARKETING = "marketing",
  DONATE = "donate",
  PAY_FINE = "pay fine",
  // illegal
  BRIBE = "bribe",
  ASSASSINATION = "assassination",
  // grey area
  LOBBY = "lobby",
  // can only be used once but can generate a huge amount of capital
  GO_PUBLIC = "go public",
}
