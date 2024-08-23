/*
 * -------------------------------
 * COMPANY
 * -------------------------------
 */

import type { Sector } from "../types";
import type { EnvironmentRecord } from "./xata";

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
  environment: EnvironmentRecord;
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

export enum TechnologyEnum {
  SOLAR = "SOLAR",
  NUCLEAR = "NUCLEAR",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  E_COMMERCE = "E_COMMERCE",
  VR = "VR",
  _5G = "_5G",
  SUPPLY_CHAIN = "SUPPLY_CHAIN",
  IOT = "IOT",
  ADVERTISING = "ADVERTISING",
  CLOUD_COMPUTING = "CLOUD_COMPUTING",
  SPACE = "SPACE",
  DRONES = "DRONES",
  CYBERSECURITY = "CYBERSECURITY",
  _3D_PRINTING = "_3D_PRINTING",
  WIND = "WIND",
  DEFENSE = "DEFENSE",
  COMPOSITES = "COMPOSITES",
  ADDITIVE_MANUFACTURING = "ADDITIVE_MANUFACTURING",
  BIOMEDICAL = "BIOMEDICAL",
  PFOF = "PFOF",
  BACTERIOPHAGES = "BACTERIOPHAGES",
  BLOCKCHAIN = "BLOCKCHAIN",
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
  HFT = "HFT",
  ELECTRIC_VEHICLES = "ELECTRIC_VEHICLES",
  CRISPR = "CRISPR",
  DESALINIZATION = "DESALINIZATION",
  MR = "MR",
  AR = "AR",
  EDGE_COMPUTING = "EDGE_COMPUTING",
  SYNTHETIC_BIOLOGY = "SYNTHETIC_BIOLOGY",
  AI = "AI",
  AUTONOMOUS_VEHICLES = "AUTONOMOUS_VEHICLES",
  SUPERCONDUCTORS = "SUPERCONDUCTORS",
  HYDROGEN = "HYDROGEN",
  RAPID_AIRSHIPS = "RAPID_AIRSHIPS",
  HOLOGRAPHIC = "HOLOGRAPHIC",
  NANOTECHNOLOGY = "NANOTECHNOLOGY",
  AID = "AID",
  QUANTUM_COMPUTING = "QUANTUM_COMPUTING",
}

export type TechAndVersion = `${TechnologyEnum}_v${1 | 2 | 3}`;

export enum __TechnologyEnum {
  AI = "Artificial Intelligence",
  BLOCKCHAIN = "blockchain",
  QUANTUM_COMPUTING = "Quantum Computing",
  NANOTECHNOLOGY = "Nanotechnology",
  ROBOTICS = "Robotics",
  _3D_PRINTING = "3D Printing",
  VIRTUAL_REALITY = "Virtual Reality",
  AUGMENTED_REALITY = "Augmented Reality",
  INTERNET_OF_THINGS = "Internet of Things",
  _5G_NETWORKS = "5G Networks",
  GENE_EDITING = "Gene Editing",
  RENEWABLE_ENERGY = "Renewable Energy",
  ELECTRIC_VEHICLES = "Electric Vehicles",
  AUTONOMOUS_VEHICLES = "Autonomous Vehicles",
  CYBERSECURITY = "Cybersecurity",
  CLOUD_COMPUTING = "Cloud Computing",
  BIG_DATA_ANALYTICS = "Big Data Analytics",
  DRONES = "Drones",
  SPACE_PROPULSION = "Space Propulsion",
  SMART_MATERIALS = "Smart Materials",
  BIO_INFORMATICS = "Bioinformatics",
  FUSION_ENERGY = "Fusion Energy",
  BRAIN_COMPUTER_INTERFACES = "Brain-Computer Interfaces",
  SYNTHETIC_BIOLOGY = "Synthetic Biology",
  VERTICAL_FARMING = "Vertical Farming",
  QUANTUM_CRYPTOGRAPHY = "Quantum Cryptography",
  HYPER_LOOP = "Hyperloop",
  EXOSKELETONS = "Exoskeletons",
  HOLOGRAPHIC_DISPLAYS = "Holographic Displays",
  SMART_GRIDS = "Smart Grids",
}

/**
 * technology unlock system - each technology has a certain number of points and levels at which they can be unlocked.
 * The points are gained by research and the levels are gained by game score
 * These in turn are determined by the difficulty of the game.
 * Difficulty settings are easy, normal, hard, real world
 *
 * examples:
 * Game settings: { difficulty: "easy" }
 */

export enum DifficultyEnum {
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
  REAL_WORLD = "real world",
}

export const techSectors: Record<keyof typeof TechnologyEnum, Sector[]> = {
  AI: [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Defense",
  ],
  BLOCKCHAIN: ["Finance", "Information Technology", "Healthcare"],
  QUANTUM_COMPUTING: [
    "Information Technology",
    "Finance",
    "Defense",
    "Healthcare",
  ],
  NANOTECHNOLOGY: ["Healthcare", "Manufacturing", "Energy", "Environmental"],
  ROBOTICS: ["Manufacturing", "Healthcare", "Defense", "Space"],
  _3D_PRINTING: ["Manufacturing", "Healthcare", "Education"],
  VIRTUAL_REALITY: ["Entertainment", "Education", "Healthcare"],
  AUGMENTED_REALITY: ["Entertainment", "Education", "Manufacturing"],
  INTERNET_OF_THINGS: [
    "Information Technology",
    "Manufacturing",
    "Energy",
    "Transportation",
  ],
  _5G_NETWORKS: ["Information Technology", "Transportation", "Entertainment"],
  GENE_EDITING: ["Healthcare", "Agriculture"],
  RENEWABLE_ENERGY: ["Energy", "Environmental"],
  ELECTRIC_VEHICLES: ["Transportation", "Energy", "Manufacturing"],
  AUTONOMOUS_VEHICLES: ["Transportation", "Information Technology"],
  CYBERSECURITY: ["Information Technology", "Defense", "Finance"],
  CLOUD_COMPUTING: ["Information Technology", "Finance", "Healthcare"],
  BIG_DATA_ANALYTICS: [
    "Information Technology",
    "Finance",
    "Healthcare",
    "Manufacturing",
  ],
  DRONES: ["Transportation", "Agriculture", "Defense"],
  SPACE_PROPULSION: ["Space", "Transportation"],
  SMART_MATERIALS: ["Manufacturing", "Energy", "Transportation"],
  BIO_INFORMATICS: ["Healthcare", "Information Technology"],
  FUSION_ENERGY: ["Energy", "Environmental"],
  BRAIN_COMPUTER_INTERFACES: [
    "Healthcare",
    "Information Technology",
    "Entertainment",
  ],
  SYNTHETIC_BIOLOGY: ["Healthcare", "Agriculture", "Manufacturing"],
  VERTICAL_FARMING: ["Agriculture", "Environmental"],
  QUANTUM_CRYPTOGRAPHY: ["Information Technology", "Defense", "Finance"],
  HYPER_LOOP: ["Transportation", "Energy"],
  EXOSKELETONS: ["Healthcare", "Manufacturing", "Defense"],
  HOLOGRAPHIC_DISPLAYS: ["Entertainment", "Education", "Manufacturing"],
  SMART_GRIDS: ["Energy", "Information Technology", "Environmental"],
};

export interface TechAndSector {
  [TechnologyEnum.AI]: CompanyTypeEnum[];
}
