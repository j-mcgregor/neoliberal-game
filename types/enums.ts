import type { Sector } from ".";

/*
 * -------------------------------
 * COMPANY
 * -------------------------------
 */

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
 * ASSASSINATION
 * -------------------------------
 */

export enum AssassinationEnum {
  POLITICAL = "political",
  CORPORATE = "corporate",
  WHISTLEBLOWER = "whistleblower",
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

export enum DifficultyEnum {
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
  REAL_WORLD = "real world",
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
  _3D_PRINTING: ["Manufacturing", "Healthcare", "Education"],
  VR: ["Entertainment", "Education", "Healthcare"],
  AR: ["Entertainment", "Education", "Manufacturing"],
  IOT: ["Information Technology", "Manufacturing", "Energy", "Transportation"],
  _5G: ["Information Technology", "Transportation", "Entertainment"],
  CRISPR: ["Healthcare", "Agriculture"],
  WIND: ["Energy", "Environmental"],
  ELECTRIC_VEHICLES: ["Transportation", "Energy", "Manufacturing"],
  AUTONOMOUS_VEHICLES: ["Transportation", "Information Technology"],
  CYBERSECURITY: ["Information Technology", "Defense", "Finance"],
  CLOUD_COMPUTING: ["Information Technology", "Finance", "Healthcare"],
  DRONES: ["Transportation", "Agriculture", "Defense"],
  SPACE: ["Space", "Transportation"],
  COMPOSITES: ["Manufacturing", "Energy", "Transportation"],
  BIOMEDICAL: ["Healthcare", "Information Technology"],
  NUCLEAR: ["Energy", "Environmental"],
  SYNTHETIC_BIOLOGY: ["Healthcare", "Agriculture", "Manufacturing"],
  HOLOGRAPHIC: ["Entertainment", "Education", "Manufacturing"],
  ADDITIVE_MANUFACTURING: ["Manufacturing", "Healthcare", "Transportation"],
  ADVERTISING: ["Marketing", "Information Technology"],
  AID: ["Healthcare", "Information Technology"],
  BACTERIOPHAGES: ["Healthcare", "Agriculture"],
  CRYPTOCURRENCY: ["Finance", "Information Technology"],
  DEFENSE: ["Defense", "Information Technology"],
  DESALINIZATION: ["Environmental", "Energy"],
  E_COMMERCE: ["Information Technology"],
  EDGE_COMPUTING: ["Information Technology", "Finance"],
  HFT: ["Finance", "Information Technology"],
  HYDROGEN: ["Energy", "Transportation"],
  MR: ["Entertainment", "Education", "Healthcare"],
  PFOF: ["Finance", "Information Technology"],
  RAPID_AIRSHIPS: ["Transportation", "Defense"],
  SOCIAL_MEDIA: ["Marketing", "Information Technology"],
  SOLAR: ["Energy", "Environmental"],
  SUPERCONDUCTORS: ["Energy", "Transportation"],
  SUPPLY_CHAIN: ["Manufacturing", "Transportation"],
};
