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
    amount,
    current_tech,
    tech_payload,
  }: {
    amount?: number;
    current_tech: TechCard[];
    tech_payload: TechAndVersion;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        if (!amount) {
          return this.migration;
        }
        const technology: TechCard[] = current_tech.map((tech) => {
          if (tech.id === tech_payload) {
            const required_research_points =
              tech.research_needed[this.difficulty].points;
            const current_research_points = tech.research_points;
            const difference =
              required_research_points - current_research_points;
            const remaining = amount - difference;

            // amount will unlock the tech
            const can_enable = amount >= difference;
            const points_to_carry_over = can_enable ? remaining : 0;

            // console.log({
            //   tech_payload,
            //   required_research_points,
            //   current_research_points,
            //   difference,
            //   remaining,
            //   amount,
            //   can_enable,
            //   points_to_carry_over,
            // });

            if (can_enable) {
              tech.enabled = true;
              tech.in_development = false;
              tech.research_points = required_research_points;

              // dispatch (with remaining research points if any)
            } else {
              tech.research_points = current_research_points + amount;
            }
            // console.log("tech :>> ", tech);
          }

          return tech;
        });

        this.migration.update.fields.technology = JSON.stringify(technology);
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
