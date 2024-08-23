import type { ActionTypeEnum, DifficultyEnum, TechnologyEnum } from "../src";

// the Action could actually be sent in a reducer pattern like Redux
export interface IAction {
  type: keyof typeof ActionTypeEnum;
  data?: unknown;
}

export interface ITechnology {
  id: keyof typeof TechnologyEnum;
  name: TechnologyEnum;
  sector: Sector[];
  research_points_needed: number;
  research_turns_needed: number;
  current_research_points: number;
  current_research_turns: number;
  unlocked: boolean;
  // todo - any extra perks that come with the technology
}

// Define interfaces for each action type
export interface IActionTurn extends IAction {
  score_factor: number;
}

export interface IActionResearch extends IAction {
  technology: keyof typeof TechnologyEnum;
  amount: number;
}

export interface IActionInvest extends IAction {
  company: string;
  amount: number;
}

export interface IActionExpand extends IAction {
  amount: number;
}

export interface IActionMarketing extends IAction {
  amount: number;
  media_type: "tv" | "radio" | "internet" | "print";
}

export interface IActionDonate extends IAction {
  organization: string;
  organisation_type: "charity" | "political" | "non-profit";
}

export interface IActionPayFine extends IAction {
  amount: number;
  reason: string;
}

export interface IActionBribe extends IAction {
  amount: number;
  target: string;
}

export interface IActionAssassination extends IAction {
  amount: number;
  target: string;
  assassination_type: "political" | "corporate" | "whistleblower";
  success: boolean;
  exposed: boolean;
  info: string;
}

export interface IActionLobby extends IAction {
  amount: number;
  target: string;
}

export interface IActionGoPublic extends IAction {
  company: string;
  shares: number;
  price_per_share: number;
  index: keyof Pick<
    EconomyRecord,
    "dow" | "nasdaq" | "s_and_p" | "ftse" | "dax"
  >;
}

export interface IActionAcquire extends IAction {
  company_acquired: string;
  cost: number;
}

// ... Define interfaces for other action types ...

// Create a type that maps each enum value to its corresponding interface
export type ActionMap = {
  TURN: IActionTurn;
  RESEARCH: IActionResearch;
  INVEST: IActionInvest;
  ACQUIRE: IActionAcquire;
  EXPAND: IActionExpand;
  MARKETING: IActionMarketing;
  DONATE: IActionDonate;
  PAY_FINE: IActionPayFine;
  BRIBE: IActionBribe;
  ASSASSINATION: IActionAssassination;
  LOBBY: IActionLobby;
  GO_PUBLIC: IActionGoPublic;
};

export type Sector =
  | "Information Technology"
  | "Healthcare"
  | "Energy"
  | "Transportation"
  | "Manufacturing"
  | "Agriculture"
  | "Finance"
  | "Entertainment"
  | "Education"
  | "Defense"
  | "Space"
  | "Environmental";

export type Settings = {
  [key in DifficultyEnum]: {
    unlocked_at: number;
    research_points_needed: number;
    research_turns_needed: number;
  };
};

export type DifficultySettings = {
  [key in keyof typeof TechnologyEnum]: Settings;
};
