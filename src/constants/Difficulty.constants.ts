import { type TechAndVersion } from "..";
import type { Sector } from "../../types";
import type { TechnologyEnum } from "../../types/enums";

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
