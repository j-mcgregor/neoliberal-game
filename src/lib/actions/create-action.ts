import type { ActionTypeEnum, IAction } from "../..";
import type { EconomyRecord } from "../../xata";

// Define interfaces for each action type
export interface IActionTurn extends IAction {
  score_factor: number;
}

export interface IActionResearch extends IAction {
  sector: string;
  technology: string;
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
  [ActionTypeEnum.TURN]: IActionTurn;
  [ActionTypeEnum.RESEARCH]: IActionResearch;
  [ActionTypeEnum.INVEST]: IActionInvest;
  [ActionTypeEnum.ACQUIRE]: IActionAcquire;
  [ActionTypeEnum.EXPAND]: IActionExpand;
  [ActionTypeEnum.MARKETING]: IActionMarketing;
  [ActionTypeEnum.DONATE]: IActionDonate;
  [ActionTypeEnum.PAY_FINE]: IActionPayFine;
  [ActionTypeEnum.BRIBE]: IActionBribe;
  [ActionTypeEnum.ASSASSINATION]: IActionAssassination;
  [ActionTypeEnum.LOBBY]: IActionLobby;
  [ActionTypeEnum.GO_PUBLIC]: IActionGoPublic;
};

// Create a function that returns the correct action type based on the input
export function createAction<T extends keyof ActionMap>(
  type: T,
  data: Omit<ActionMap[T], "type">
): ActionMap[T] {
  return {
    type,
    data,
  } as ActionMap[T];
}
