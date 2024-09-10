import type {
  AssassinationEnum,
  BribeTypeEnum,
  DifficultyEnum,
  NaturalDisasterTypeEnum,
  PoliticalPersuasionEnum,
  TechnologyEnum,
} from "../types/enums";
import type { EnvironmentRecord } from "./xata";

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
  starting_difficulty: DifficultyEnum;
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
  environment: EnvironmentRecord;
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

/*
 * -------------------------------
 * POLITICS
 * -------------------------------
 */

export interface IPolitics {
  name: string;
  persuasion: PoliticalPersuasionEnum;
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

export type TechAndVersion = `${TechnologyEnum}_v${1 | 2 | 3}`;
