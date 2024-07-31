import type { ITechnology } from "../../types";
import { isValidTechArray, makeDefaultTechnology } from "./type-checkers.utils";
import type { ActionTypeEnum, TechnologyEnum } from "..";
import type { UpdateMigration } from "../../types/xata-custom";

export class HandleFundamentals {
  migration: UpdateMigration;
  type: keyof typeof ActionTypeEnum;

  constructor(id: string, type: keyof typeof ActionTypeEnum) {
    this.migration = {
      update: {
        table: "company_fundamentals",
        fields: {},
        id,
      },
    };
    this.type = type;
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
    technology,
    amount,
    tech_payload,
  }: {
    technology?: ITechnology[];
    amount?: number;
    tech_payload: keyof typeof TechnologyEnum;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        // return if technology is not an array or amount is not a number
        if (!Array.isArray(technology) || typeof amount !== "number") {
          return this.migration;
        }

        // return if technology is not a valid array
        if (technology.length && !isValidTechArray(technology)) {
          return this.migration;
        }

        const techExists = technology.find((tech) => tech.id === tech_payload);

        // if technology is empty or tech does not exist, add a default technology
        if (technology.length === 0 || !techExists) {
          const tech = makeDefaultTechnology(tech_payload, 1000, 10);
          this.migration.update.fields.technology = [
            { ...tech, current_research_points: amount },
          ] as ITechnology[];
        }

        // if technology exists, update the current research points and turns
        if (technology.length && techExists) {
          const _technology = technology.map((tech) => {
            if (tech.id === tech_payload) {
              tech.current_research_points += amount;
              tech.current_research_turns += 1;
            }

            return tech;
          });
          this.migration.update.fields.technology = _technology;
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

  companySize({
    company_size,
    amount,
  }: {
    company_size?: number | null;
    amount?: number;
  }): UpdateMigration {
    switch (this.type) {
      case "RESEARCH":
        if (typeof company_size === "number" && typeof amount === "number") {
          this.migration.update.fields.company_size = company_size + amount;
        }
    }

    return this.migration;
  }
}
