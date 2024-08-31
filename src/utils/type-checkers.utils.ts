import type { TechCard } from "../constants/Difficulty.constants";

export function isTechnology(value: unknown): value is TechCard {
  if (typeof value !== "object" || value === null) return false;

  const technology = value as TechCard;

  return (
    typeof technology.name === "string" &&
    Array.isArray(technology.sectors) &&
    technology.sectors.every((sector) => typeof sector === "string") &&
    typeof technology.unlocked === "boolean" &&
    typeof technology.enabled === "boolean" &&
    typeof technology.in_development === "boolean"
  );
}

export function isValidTechArray(value: unknown): value is TechCard[] {
  if (!Array.isArray(value)) return false;

  return value.every(isTechnology);
}
