import { TechnologyEnum, techSectors } from "..";
import type { ITechnology } from "../../types";

export function isTechnology(value: unknown): value is ITechnology {
  if (typeof value !== "object" || value === null) return false;

  const technology = value as ITechnology;

  return (
    typeof technology.name === "string" &&
    Array.isArray(technology.sector) &&
    technology.sector.every((sector) => typeof sector === "string") &&
    typeof technology.research_points_needed === "number" &&
    typeof technology.research_turns_needed === "number" &&
    typeof technology.current_research_points === "number" &&
    typeof technology.current_research_turns === "number" &&
    typeof technology.unlocked === "boolean"
  );
}

export function isValidTechArray(value: unknown): value is ITechnology[] {
  if (!Array.isArray(value)) return false;

  return value.every(isTechnology);
}

export function makeDefaultTechnology(
  name: keyof typeof TechnologyEnum,
  research_points_needed = 0,
  research_turns_needed = 0
): ITechnology {
  return {
    id: name,
    name: TechnologyEnum[name],
    sector: techSectors[name],
    research_points_needed,
    research_turns_needed,
    current_research_points: 0,
    current_research_turns: 0,
    unlocked: false,
  };
}
