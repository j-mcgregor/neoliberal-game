import { isValidTechArray } from "./type-checkers.utils";
import type { UpdateMigration } from "../../types/xata-custom";
import { ActionTypeEnum, DifficultyEnum } from "../../types/enums";
import type { TechCard } from "../constants/Difficulty.constants";
import type { TechAndVersion } from "..";

export class HandleFundamentals {
  migration: UpdateMigration;
  type: keyof typeof ActionTypeEnum;
  difficulty: DifficultyEnum = DifficultyEnum.EASY;

  constructor(
    id: string,
    type: keyof typeof ActionTypeEnum,
    difficulty?: DifficultyEnum
  ) {
    this.migration = {
      update: {
        table: "company_fundamentals",
        fields: {},
        id,
      },
    };

    this.type = type;

    if (difficulty) {
      this.difficulty = difficulty;
    }
  }

  expenses({
    expenses,
    amount,
  }: {
    expenses?: number | null;
    amount?: number;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        if (typeof expenses === "number" && typeof amount === "number") {
          this.migration.update.fields.expenses = expenses + amount;
        }
        break;
    }

    return this.migration;
  }

  technology({
    current_tech,
    amount,
    tech_payload,
  }: {
    current_tech?: TechCard[];
    amount?: number;
    tech_payload: TechAndVersion;
  }): UpdateMigration {
    console.log("current_tech :>> ", current_tech);
    console.log("tech_payload :>> ", tech_payload);
    switch (this.type) {
      case "RESEARCH":
        // return if technology is not an array or amount is not a number
        if (!Array.isArray(current_tech) || typeof amount !== "number") {
          return this.migration;
        }

        // return if technology is not a valid array
        if (current_tech.length && !isValidTechArray(current_tech)) {
          return this.migration;
        }

        const techExists = current_tech.find(
          (tech) => tech.id === tech_payload
        );

        // if current_tech is empty or tech does not exist, add a default current_tech
        if (current_tech.length === 0 || !techExists) {
          // const { research_points_needed, research_turns_needed, unlocked_at } =
          //   difficultySettings[tech_payload][this.difficulty];
          // const tech = makeDefaultTechnology(
          //   tech_payload,
          //   research_points_needed,
          //   research_turns_needed
          // );
          // this.migration.update.fields.technology = JSON.stringify([
          //   { ...tech, current_research_points: amount },
          // ] as ITechnology[]);
        }

        // if technology exists, update the current research points and turns
        if (current_tech.length && techExists) {
          // this.migration.update.fields.technology = JSON.stringify(_technology);
        }
    }

    return this.migration;
  }

  cash({
    cash,
    amount,
  }: {
    cash?: number | null;
    amount?: number;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        if (typeof cash === "number" && typeof amount === "number") {
          this.migration.update.fields.cash = cash - amount;
        }
        break;
    }

    return this.migration;
  }

  liabilities({
    liabilities,
    amount,
  }: {
    liabilities?: number | null;
    amount?: number;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        const cash = this.migration.update.fields.cash;
        if (typeof liabilities === "number" && typeof amount === "number") {
          this.migration.update.fields.liabilities = liabilities - amount;
        }
    }
    return this.migration;
  }
}
