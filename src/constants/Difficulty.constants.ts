import { TechnologyEnum, techSectors, type TechAndVersion } from "..";
import type { DifficultySettings, Sector } from "../../types";

/**
 * Let's have a think about Civ V does tech:
 * - Techs are in a tree
 * - That tree is spread across eras
 * - Some tech acan only be unlocked by unlocking all the tech in the previous era
 * - All tech can only be unlocked by unlocking all the tech in that tech's branch
 * eg
 * Tech 1
 * |      Tech 2                      // micro business
 * Tech 2
 * |        Tech 3
 * -----------------------------
 * |        |
 * Tech 4   Tech 5
 * |        |       \                 // small business
 * Tech 6   Tech 7  Tech 8
 * |         \      /
 * --------------------------------
 * Tech 9     Tech 10
 * \          /
 *    Tech 11                         // medium business etc
 */

// order of tech being unlocked
export const techOrder: Array<keyof typeof TechnologyEnum> = [
  "CLOUD_COMPUTING",
  "DRONES",
  "CYBERSECURITY",
  "VERTICAL_FARMING",
  "VIRTUAL_REALITY",
  "BIG_DATA_ANALYTICS",
  "_5G_NETWORKS",
  "RENEWABLE_ENERGY",
  "ROBOTICS",
  "INTERNET_OF_THINGS",
  "_3D_PRINTING",
  "ELECTRIC_VEHICLES",
  "BLOCKCHAIN",
  "AUGMENTED_REALITY",
  "SMART_GRIDS",
  "GENE_EDITING",
  "NANOTECHNOLOGY",
  "EXOSKELETONS",
  "AI",
  "SMART_MATERIALS",
  "AUTONOMOUS_VEHICLES",
  "BIO_INFORMATICS",
  "HYPER_LOOP",
  "QUANTUM_COMPUTING",
  "HOLOGRAPHIC_DISPLAYS",
  "FUSION_ENERGY",
  "QUANTUM_CRYPTOGRAPHY",
  "SPACE_PROPULSION",
  "BRAIN_COMPUTER_INTERFACES",
  "SYNTHETIC_BIOLOGY",
];

// function makeDifficultySettings() {
//   return techOrder.reduce((acc, tech, i) => {
//     acc[tech] = {
//       easy: {
//         unlocked_at: i + 1,
//         research_points_needed: 1000 * i + 1,
//         research_turns_needed: 10 + i * 5,
//       },
//       normal: {
//         unlocked_at: i + 1,
//         research_points_needed: 2000 * i + 1,
//         research_turns_needed: 20 + i * 5,
//       },
//       hard: {
//         unlocked_at: i + 1,
//         research_points_needed: 3000 * i + 1,
//         research_turns_needed: 30 + i * 5,
//       },
//       "real world": {
//         unlocked_at: i + 1,
//         research_points_needed: 4000 * i + 1,
//         research_turns_needed: 40 + i * 5,
//       },
//     };
//     return acc;
//   }, {} as DifficultySettings);
// }

// console.log(JSON.stringify(makeDifficultySettings()));

export const difficultySettings: DifficultySettings = {
  CLOUD_COMPUTING: {
    easy: {
      unlocked_at: 1,
      research_points_needed: 1,
      research_turns_needed: 10,
    },
    normal: {
      unlocked_at: 1,
      research_points_needed: 1,
      research_turns_needed: 20,
    },
    hard: {
      unlocked_at: 1,
      research_points_needed: 1,
      research_turns_needed: 30,
    },
    "real world": {
      unlocked_at: 1,
      research_points_needed: 1,
      research_turns_needed: 40,
    },
  },
  DRONES: {
    easy: {
      unlocked_at: 2,
      research_points_needed: 1001,
      research_turns_needed: 15,
    },
    normal: {
      unlocked_at: 2,
      research_points_needed: 2001,
      research_turns_needed: 25,
    },
    hard: {
      unlocked_at: 2,
      research_points_needed: 3001,
      research_turns_needed: 35,
    },
    "real world": {
      unlocked_at: 2,
      research_points_needed: 4001,
      research_turns_needed: 45,
    },
  },
  CYBERSECURITY: {
    easy: {
      unlocked_at: 3,
      research_points_needed: 2001,
      research_turns_needed: 20,
    },
    normal: {
      unlocked_at: 3,
      research_points_needed: 4001,
      research_turns_needed: 30,
    },
    hard: {
      unlocked_at: 3,
      research_points_needed: 6001,
      research_turns_needed: 40,
    },
    "real world": {
      unlocked_at: 3,
      research_points_needed: 8001,
      research_turns_needed: 50,
    },
  },
  VERTICAL_FARMING: {
    easy: {
      unlocked_at: 4,
      research_points_needed: 3001,
      research_turns_needed: 25,
    },
    normal: {
      unlocked_at: 4,
      research_points_needed: 6001,
      research_turns_needed: 35,
    },
    hard: {
      unlocked_at: 4,
      research_points_needed: 9001,
      research_turns_needed: 45,
    },
    "real world": {
      unlocked_at: 4,
      research_points_needed: 12001,
      research_turns_needed: 55,
    },
  },
  VIRTUAL_REALITY: {
    easy: {
      unlocked_at: 5,
      research_points_needed: 4001,
      research_turns_needed: 30,
    },
    normal: {
      unlocked_at: 5,
      research_points_needed: 8001,
      research_turns_needed: 40,
    },
    hard: {
      unlocked_at: 5,
      research_points_needed: 12001,
      research_turns_needed: 50,
    },
    "real world": {
      unlocked_at: 5,
      research_points_needed: 16001,
      research_turns_needed: 60,
    },
  },
  BIG_DATA_ANALYTICS: {
    easy: {
      unlocked_at: 6,
      research_points_needed: 5001,
      research_turns_needed: 35,
    },
    normal: {
      unlocked_at: 6,
      research_points_needed: 10001,
      research_turns_needed: 45,
    },
    hard: {
      unlocked_at: 6,
      research_points_needed: 15001,
      research_turns_needed: 55,
    },
    "real world": {
      unlocked_at: 6,
      research_points_needed: 20001,
      research_turns_needed: 65,
    },
  },
  _5G_NETWORKS: {
    easy: {
      unlocked_at: 7,
      research_points_needed: 6001,
      research_turns_needed: 40,
    },
    normal: {
      unlocked_at: 7,
      research_points_needed: 12001,
      research_turns_needed: 50,
    },
    hard: {
      unlocked_at: 7,
      research_points_needed: 18001,
      research_turns_needed: 60,
    },
    "real world": {
      unlocked_at: 7,
      research_points_needed: 24001,
      research_turns_needed: 70,
    },
  },
  RENEWABLE_ENERGY: {
    easy: {
      unlocked_at: 8,
      research_points_needed: 7001,
      research_turns_needed: 45,
    },
    normal: {
      unlocked_at: 8,
      research_points_needed: 14001,
      research_turns_needed: 55,
    },
    hard: {
      unlocked_at: 8,
      research_points_needed: 21001,
      research_turns_needed: 65,
    },
    "real world": {
      unlocked_at: 8,
      research_points_needed: 28001,
      research_turns_needed: 75,
    },
  },
  ROBOTICS: {
    easy: {
      unlocked_at: 9,
      research_points_needed: 8001,
      research_turns_needed: 50,
    },
    normal: {
      unlocked_at: 9,
      research_points_needed: 16001,
      research_turns_needed: 60,
    },
    hard: {
      unlocked_at: 9,
      research_points_needed: 24001,
      research_turns_needed: 70,
    },
    "real world": {
      unlocked_at: 9,
      research_points_needed: 32001,
      research_turns_needed: 80,
    },
  },
  INTERNET_OF_THINGS: {
    easy: {
      unlocked_at: 10,
      research_points_needed: 9001,
      research_turns_needed: 55,
    },
    normal: {
      unlocked_at: 10,
      research_points_needed: 18001,
      research_turns_needed: 65,
    },
    hard: {
      unlocked_at: 10,
      research_points_needed: 27001,
      research_turns_needed: 75,
    },
    "real world": {
      unlocked_at: 10,
      research_points_needed: 36001,
      research_turns_needed: 85,
    },
  },
  _3D_PRINTING: {
    easy: {
      unlocked_at: 11,
      research_points_needed: 10001,
      research_turns_needed: 60,
    },
    normal: {
      unlocked_at: 11,
      research_points_needed: 20001,
      research_turns_needed: 70,
    },
    hard: {
      unlocked_at: 11,
      research_points_needed: 30001,
      research_turns_needed: 80,
    },
    "real world": {
      unlocked_at: 11,
      research_points_needed: 40001,
      research_turns_needed: 90,
    },
  },
  ELECTRIC_VEHICLES: {
    easy: {
      unlocked_at: 12,
      research_points_needed: 11001,
      research_turns_needed: 65,
    },
    normal: {
      unlocked_at: 12,
      research_points_needed: 22001,
      research_turns_needed: 75,
    },
    hard: {
      unlocked_at: 12,
      research_points_needed: 33001,
      research_turns_needed: 85,
    },
    "real world": {
      unlocked_at: 12,
      research_points_needed: 44001,
      research_turns_needed: 95,
    },
  },
  BLOCKCHAIN: {
    easy: {
      unlocked_at: 13,
      research_points_needed: 12001,
      research_turns_needed: 70,
    },
    normal: {
      unlocked_at: 13,
      research_points_needed: 24001,
      research_turns_needed: 80,
    },
    hard: {
      unlocked_at: 13,
      research_points_needed: 36001,
      research_turns_needed: 90,
    },
    "real world": {
      unlocked_at: 13,
      research_points_needed: 48001,
      research_turns_needed: 100,
    },
  },
  AUGMENTED_REALITY: {
    easy: {
      unlocked_at: 14,
      research_points_needed: 13001,
      research_turns_needed: 75,
    },
    normal: {
      unlocked_at: 14,
      research_points_needed: 26001,
      research_turns_needed: 85,
    },
    hard: {
      unlocked_at: 14,
      research_points_needed: 39001,
      research_turns_needed: 95,
    },
    "real world": {
      unlocked_at: 14,
      research_points_needed: 52001,
      research_turns_needed: 105,
    },
  },
  SMART_GRIDS: {
    easy: {
      unlocked_at: 15,
      research_points_needed: 14001,
      research_turns_needed: 80,
    },
    normal: {
      unlocked_at: 15,
      research_points_needed: 28001,
      research_turns_needed: 90,
    },
    hard: {
      unlocked_at: 15,
      research_points_needed: 42001,
      research_turns_needed: 100,
    },
    "real world": {
      unlocked_at: 15,
      research_points_needed: 56001,
      research_turns_needed: 110,
    },
  },
  GENE_EDITING: {
    easy: {
      unlocked_at: 16,
      research_points_needed: 15001,
      research_turns_needed: 85,
    },
    normal: {
      unlocked_at: 16,
      research_points_needed: 30001,
      research_turns_needed: 95,
    },
    hard: {
      unlocked_at: 16,
      research_points_needed: 45001,
      research_turns_needed: 105,
    },
    "real world": {
      unlocked_at: 16,
      research_points_needed: 60001,
      research_turns_needed: 115,
    },
  },
  NANOTECHNOLOGY: {
    easy: {
      unlocked_at: 17,
      research_points_needed: 16001,
      research_turns_needed: 90,
    },
    normal: {
      unlocked_at: 17,
      research_points_needed: 32001,
      research_turns_needed: 100,
    },
    hard: {
      unlocked_at: 17,
      research_points_needed: 48001,
      research_turns_needed: 110,
    },
    "real world": {
      unlocked_at: 17,
      research_points_needed: 64001,
      research_turns_needed: 120,
    },
  },
  EXOSKELETONS: {
    easy: {
      unlocked_at: 18,
      research_points_needed: 17001,
      research_turns_needed: 95,
    },
    normal: {
      unlocked_at: 18,
      research_points_needed: 34001,
      research_turns_needed: 105,
    },
    hard: {
      unlocked_at: 18,
      research_points_needed: 51001,
      research_turns_needed: 115,
    },
    "real world": {
      unlocked_at: 18,
      research_points_needed: 68001,
      research_turns_needed: 125,
    },
  },
  AI: {
    easy: {
      unlocked_at: 19,
      research_points_needed: 18001,
      research_turns_needed: 100,
    },
    normal: {
      unlocked_at: 19,
      research_points_needed: 36001,
      research_turns_needed: 110,
    },
    hard: {
      unlocked_at: 19,
      research_points_needed: 54001,
      research_turns_needed: 120,
    },
    "real world": {
      unlocked_at: 19,
      research_points_needed: 72001,
      research_turns_needed: 130,
    },
  },
  SMART_MATERIALS: {
    easy: {
      unlocked_at: 20,
      research_points_needed: 19001,
      research_turns_needed: 105,
    },
    normal: {
      unlocked_at: 20,
      research_points_needed: 38001,
      research_turns_needed: 115,
    },
    hard: {
      unlocked_at: 20,
      research_points_needed: 57001,
      research_turns_needed: 125,
    },
    "real world": {
      unlocked_at: 20,
      research_points_needed: 76001,
      research_turns_needed: 135,
    },
  },
  AUTONOMOUS_VEHICLES: {
    easy: {
      unlocked_at: 21,
      research_points_needed: 20001,
      research_turns_needed: 110,
    },
    normal: {
      unlocked_at: 21,
      research_points_needed: 40001,
      research_turns_needed: 120,
    },
    hard: {
      unlocked_at: 21,
      research_points_needed: 60001,
      research_turns_needed: 130,
    },
    "real world": {
      unlocked_at: 21,
      research_points_needed: 80001,
      research_turns_needed: 140,
    },
  },
  BIO_INFORMATICS: {
    easy: {
      unlocked_at: 22,
      research_points_needed: 21001,
      research_turns_needed: 115,
    },
    normal: {
      unlocked_at: 22,
      research_points_needed: 42001,
      research_turns_needed: 125,
    },
    hard: {
      unlocked_at: 22,
      research_points_needed: 63001,
      research_turns_needed: 135,
    },
    "real world": {
      unlocked_at: 22,
      research_points_needed: 84001,
      research_turns_needed: 145,
    },
  },
  HYPER_LOOP: {
    easy: {
      unlocked_at: 23,
      research_points_needed: 22001,
      research_turns_needed: 120,
    },
    normal: {
      unlocked_at: 23,
      research_points_needed: 44001,
      research_turns_needed: 130,
    },
    hard: {
      unlocked_at: 23,
      research_points_needed: 66001,
      research_turns_needed: 140,
    },
    "real world": {
      unlocked_at: 23,
      research_points_needed: 88001,
      research_turns_needed: 150,
    },
  },
  QUANTUM_COMPUTING: {
    easy: {
      unlocked_at: 24,
      research_points_needed: 23001,
      research_turns_needed: 125,
    },
    normal: {
      unlocked_at: 24,
      research_points_needed: 46001,
      research_turns_needed: 135,
    },
    hard: {
      unlocked_at: 24,
      research_points_needed: 69001,
      research_turns_needed: 145,
    },
    "real world": {
      unlocked_at: 24,
      research_points_needed: 92001,
      research_turns_needed: 155,
    },
  },
  HOLOGRAPHIC_DISPLAYS: {
    easy: {
      unlocked_at: 25,
      research_points_needed: 24001,
      research_turns_needed: 130,
    },
    normal: {
      unlocked_at: 25,
      research_points_needed: 48001,
      research_turns_needed: 140,
    },
    hard: {
      unlocked_at: 25,
      research_points_needed: 72001,
      research_turns_needed: 150,
    },
    "real world": {
      unlocked_at: 25,
      research_points_needed: 96001,
      research_turns_needed: 160,
    },
  },
  FUSION_ENERGY: {
    easy: {
      unlocked_at: 26,
      research_points_needed: 25001,
      research_turns_needed: 135,
    },
    normal: {
      unlocked_at: 26,
      research_points_needed: 50001,
      research_turns_needed: 145,
    },
    hard: {
      unlocked_at: 26,
      research_points_needed: 75001,
      research_turns_needed: 155,
    },
    "real world": {
      unlocked_at: 26,
      research_points_needed: 100001,
      research_turns_needed: 165,
    },
  },
  QUANTUM_CRYPTOGRAPHY: {
    easy: {
      unlocked_at: 27,
      research_points_needed: 26001,
      research_turns_needed: 140,
    },
    normal: {
      unlocked_at: 27,
      research_points_needed: 52001,
      research_turns_needed: 150,
    },
    hard: {
      unlocked_at: 27,
      research_points_needed: 78001,
      research_turns_needed: 160,
    },
    "real world": {
      unlocked_at: 27,
      research_points_needed: 104001,
      research_turns_needed: 170,
    },
  },
  SPACE_PROPULSION: {
    easy: {
      unlocked_at: 28,
      research_points_needed: 27001,
      research_turns_needed: 145,
    },
    normal: {
      unlocked_at: 28,
      research_points_needed: 54001,
      research_turns_needed: 155,
    },
    hard: {
      unlocked_at: 28,
      research_points_needed: 81001,
      research_turns_needed: 165,
    },
    "real world": {
      unlocked_at: 28,
      research_points_needed: 108001,
      research_turns_needed: 175,
    },
  },
  BRAIN_COMPUTER_INTERFACES: {
    easy: {
      unlocked_at: 29,
      research_points_needed: 28001,
      research_turns_needed: 150,
    },
    normal: {
      unlocked_at: 29,
      research_points_needed: 56001,
      research_turns_needed: 160,
    },
    hard: {
      unlocked_at: 29,
      research_points_needed: 84001,
      research_turns_needed: 170,
    },
    "real world": {
      unlocked_at: 29,
      research_points_needed: 112001,
      research_turns_needed: 180,
    },
  },
  SYNTHETIC_BIOLOGY: {
    easy: {
      unlocked_at: 30,
      research_points_needed: 29001,
      research_turns_needed: 155,
    },
    normal: {
      unlocked_at: 30,
      research_points_needed: 58001,
      research_turns_needed: 165,
    },
    hard: {
      unlocked_at: 30,
      research_points_needed: 87001,
      research_turns_needed: 175,
    },
    "real world": {
      unlocked_at: 30,
      research_points_needed: 116001,
      research_turns_needed: 185,
    },
  },
};

export enum CompanySize {
  MICRO = "MICRO",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  NATIONAL = "NATIONAL",
  GLOBAL = "GLOBAL",
  DOMINANT = "DOMINANT",
  TOP_100 = "TOP_100",
  TOP_10 = "TOP_10",
  MONOPOLY = "MONOPOLY",
}

enum GameSpeed {
  SLOW = 200,
  NORMAL = 150,
  FAST = 100,
  RAPID = 50,
}

enum DifficultyEnum {
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard",
  REAL_WORLD = "real world",
}

/**
 * need to make a property for total_research_points
 */
enum BonusType {
  DOMESTIC_INFLUENCE = "DOMESTIC_INFLUENCE",
  FOREIGN_INFLUENCE = "FOREIGN_INFLUENCE",
  REPUTATION = "REPUTATION",
  LOBBYING_COSTS = "LOBBYING_COSTS",
  LOBBYING_EFFECTIVENESS = "LOBBYING_EFFECTIVENESS",
}

interface BonusAction {
  type: keyof typeof BonusType;
  data: {
    points: number;
  };
}

export interface TechCard {
  _v: number;
  id: TechAndVersion;
  name: TechnologyEnum;
  description: string;
  sectors: Sector[];
  /**
   * This is a flag to indicate that the tech is unlocked.
   * Turns to true once:
   * - unlocked_at_size === company size
   * @note - action triggered
   */
  unlocked: boolean;
  /**
   * This is a flag to indicate that the tech is in development.
   * Only one tech can be in development at a time.
   * @note - action triggered
   */
  in_development: boolean;
  /**
   * This is a flag to indicate that the tech is enabled.
   * Turns to true once:
   * - unlocked === true
   * - in_development === true
   * - research_needed[difficulty].points >= current_research_points
   * @note - action triggered
   */
  enabled: boolean;
  unlocked_at_size: keyof typeof CompanySize;
  unlocked_by_tech: Array<TechAndVersion>;
  unlocks: Array<TechAndVersion>;
  research_needed: Record<
    keyof typeof DifficultyEnum,
    {
      // each new tech unlocked increases the research points needed by a value
      // determined by the player's turn and difficulty
      // Aquiring a company that has that tech will unlock and enable it
      // and that tech's research points will be allocated to the next tech.
      points: number;
      turns: number;
    }
  >;
  /**
   * The bonus property is a placeholder for any extra perks that come with the technology.
   * They will be sent along with the action.
   */
  bonus: Array<BonusAction>;
  // domestic_influence
  // foreign_influence
  // reputation
  // reduce lobbying costs / increase lobbying effectiveness
  // research_points_needed // if something like AI, but maybe over-complicating things
}
