import type {
  EditableData,
  Identifiable,
  Repository,
  SelectableColumnWithObjectNotation,
  TransactionOperation,
} from "@xata.io/client";
import {
  getXataClient,
  type CompanyFundamentalsRecord,
  type DatabaseSchema,
} from "../xata";
import type { createAction } from "../lib/actions/create-action";
import { ActionTypeEnum, DifficultyEnum } from "..";
import type { Root } from "../root";
import type {
  IActionAcquire,
  IActionAssassination,
  IActionBribe,
  IActionDonate,
  IActionExpand,
  IActionGoPublic,
  IActionInvest,
  IActionLobby,
  IActionMarketing,
  IActionPayFine,
  IActionResearch,
  IActionTurn,
} from "../../types";
import { HandleFundamentals } from "../utils/handle-fundamentals.utils";
import type { UpdateMigration } from "../../types/xata-custom";
import { isTechnology, isValidTechArray } from "../utils/type-checkers.utils";
import {
  difficultySettings,
  techOrder,
} from "../constants/Difficulty.constants";

export class CompanyFundamentalsModel {
  #companyFundamentalsRecord: Repository<CompanyFundamentalsRecord>;
  root: Root;

  companyFundamentalActionMap: Record<
    ActionTypeEnum,
    (
      id: string,
      data: any,
      difficulty?: DifficultyEnum
    ) => Promise<UpdateMigration>
  > = {
    [ActionTypeEnum.TURN]: (id, data: IActionTurn) => this.handleTurn(id, data),
    [ActionTypeEnum.RESEARCH]: (
      id,
      data: IActionResearch,
      difficulty = DifficultyEnum.EASY
    ) => this.handleResearch(id, data, difficulty),
    [ActionTypeEnum.INVEST]: (
      id,
      data: IActionInvest,
      difficulty = DifficultyEnum.EASY
    ) => this.handleInvest(id, data, difficulty),
    [ActionTypeEnum.ACQUIRE]: (
      id,
      data: IActionAcquire,
      difficulty = DifficultyEnum.EASY
    ) => this.handleAcquire(id, data, difficulty),
    [ActionTypeEnum.EXPAND]: (
      id,
      data: IActionExpand,
      difficulty = DifficultyEnum.EASY
    ) => this.handleExpand(id, data, difficulty),
    [ActionTypeEnum.MARKETING]: (
      id,
      data: IActionMarketing,
      difficulty = DifficultyEnum.EASY
    ) => this.handleMarketing(id, data, difficulty),
    [ActionTypeEnum.DONATE]: (
      id,
      data: IActionDonate,
      difficulty = DifficultyEnum.EASY
    ) => this.handleDonate(id, data, difficulty),
    [ActionTypeEnum.PAY_FINE]: (
      id,
      data: IActionPayFine,
      difficulty = DifficultyEnum.EASY
    ) => this.handlePayFine(id, data, difficulty),
    [ActionTypeEnum.BRIBE]: (
      id,
      data: IActionBribe,
      difficulty = DifficultyEnum.EASY
    ) => this.handleBribe(id, data, difficulty),
    [ActionTypeEnum.ASSASSINATION]: (
      id,
      data: IActionAssassination,
      difficulty = DifficultyEnum.EASY
    ) => this.handleAssassination(id, data, difficulty),
    [ActionTypeEnum.LOBBY]: (
      id,
      data: IActionLobby,
      difficulty = DifficultyEnum.EASY
    ) => this.handleLobby(id, data, difficulty),
    [ActionTypeEnum.GO_PUBLIC]: (
      id,
      data: IActionGoPublic,
      difficulty = DifficultyEnum.EASY
    ) => this.handleGoPublic(id, data, difficulty),
  };

  constructor(_root: Root) {
    this.root = _root;
    this.#companyFundamentalsRecord = getXataClient().db.company_fundamentals;
  }

  async get(
    id: string,
    columns: SelectableColumnWithObjectNotation<
      CompanyFundamentalsRecord,
      []
    >[] = ["*"]
  ) {
    const cf = await this.#companyFundamentalsRecord
      .select(columns)
      .getFirst({ filter: { id } });

    if (!cf) {
      throw new Error(`Company Fundamentals with id ${id} not found`);
    }

    return cf;
  }

  migration_update(
    id: string,
    fields: Partial<EditableData<CompanyFundamentalsRecord>> = {}
  ): TransactionOperation<DatabaseSchema, keyof DatabaseSchema> {
    return {
      update: {
        table: "company_fundamentals",
        id,
        fields,
      },
    };
  }

  async handleTurn(id: string, data: any) {
    const handler = new HandleFundamentals(id, "TURN");

    return handler.migration;
  }

  /**
   * @RESEARCH
   * @description - research new technology
   * technology ++
   * expenses +
   * cash -
   * liabilities +
   */
  async handleResearch(
    id: string,
    data: IActionResearch,
    difficulty: DifficultyEnum
  ) {
    const cf = await this.get(id, [
      "technology",
      "expenses",
      "cash",
      "liabilities",
      "company_size",
    ]);

    const handler = new HandleFundamentals(id, "RESEARCH", difficulty);

    handler.expenses({
      expenses: cf.expenses,
      amount: data.amount,
    });

    handler.technology({
      current_tech: cf.technology,
      amount: data.amount,
      tech_payload: data.technology,
    });

    handler.cash({
      cash: cf.cash,
      amount: data.amount,
    });

    handler.liabilities({
      liabilities: cf.liabilities,
      amount: Number(handler.migration.update.fields.cash),
    });

    return handler.migration;
  }

  /**
   * @INVEST
   * @description - invest in your company, more generally than just in research
   * technology +
   * assets +
   * cash -
   * net profit -
   * expenses +
   * cash - (low for round but increases over time)
   */

  async handleInvest(
    id: string,
    data: IActionInvest,
    difficulty: DifficultyEnum
  ) {
    const cf = await this.get(id, [
      "technology",
      "assets",
      "cash",
      "net_profit",
      "expenses",
      "cash",
    ]);

    const handler = new HandleFundamentals(id, "INVEST", difficulty);

    if (!isValidTechArray(cf.technology)) {
      return handler.migration;
    }

    const tech_payload = cf.technology.find((t) => {
      const currentIncompleteTechnology =
        t.unlocked &&
        t.current_research_turns < t.research_turns_needed &&
        t.current_research_points < t.research_points_needed;

      console.log(
        "currentIncompleteTechnology :>> ",
        currentIncompleteTechnology
      );
      if (currentIncompleteTechnology) {
        return t;
      }

      const techIndex = techOrder.indexOf(t.id);
      const nextTech = techOrder[techIndex + 1];
      console.log("nextTech :>> ", difficultySettings[nextTech][difficulty]);
      // get tech that is unlocked, under development and incomplete
      // if no tech exists, move on to the next one
      // I need a research hierarchy to determine which tech to research next
      return difficultySettings[nextTech][difficulty];
    });
    console.log("tech_payload :>> ", tech_payload);

    if (!isTechnology(tech_payload)) {
      throw new Error(`No technology found for company with id ${id}`);
    }

    // split amount between research and assets
    const split = data.amount / 2;

    handler.technology({
      current_tech: cf.technology,
      amount: split,
      tech_payload: tech_payload.id,
    });

    return handler.migration;
  }
  /**
   * @ACQUIRE
   * technology +
   * company size +
   * assets +
   * liabilities +
   * cash -
   * expenses +
   * revenue +
   * net profit +/-
   */
  async handleAcquire(
    id: string,
    data: IActionAcquire,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "ACQUIRE");

    return handler.migration;
  }
  /**
   * @EXPAND
   * company size +
   * liabilities +
   * cash -
   * expenses +
   * revenue +/-
   * net profit +/-
   */
  async handleExpand(
    id: string,
    data: IActionExpand,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "EXPAND");

    return handler.migration;
  }
  /**
   * @MARKETING
   * expenses +
   * cash -
   * revenue +/-
   * net profit +/-
   */
  async handleMarketing(
    id: string,
    data: IActionMarketing,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "MARKETING");

    return handler.migration;
  }
  /**
   * @DONATE
   * domestic influence +
   * cash -
   * liabilities - (tax write-off)
   */
  async handleDonate(
    id: string,
    data: IActionDonate,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "DONATE");

    return handler.migration;
  }
  /**
   * @PAY_FINE
   * domestic influence -
   * cash -
   */
  async handlePayFine(
    id: string,
    data: IActionPayFine,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "PAY_FINE");

    return handler.migration;
  }
  /**
   * @BRIBE
   * domestic influence +
   * cash -
   */
  async handleBribe(
    id: string,
    data: IActionBribe,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "BRIBE");

    return handler.migration;
  }
  /**
   * @ASSASSINATION
   * domestic influence +
   * foreign influence +/-
   * cash -
   */
  async handleAssassination(
    id: string,
    data: IActionAssassination,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "ASSASSINATION");

    return handler.migration;
  }
  /**
   * @LOBBY
   * domestic influence +
   * cash -
   */
  async handleLobby(
    id: string,
    data: IActionLobby,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "LOBBY");

    return handler.migration;
  }
  /**
   * @GO_PUBLIC
   * shares outstanding +
   * cash ++
   * assets +
   * liabilities -
   * stock price +
   */
  async handleGoPublic(
    id: string,
    data: IActionGoPublic,
    difficulty: DifficultyEnum
  ) {
    const handler = new HandleFundamentals(id, "GO_PUBLIC");

    return handler.migration;
  }

  async create(
    country: Omit<EditableData<CompanyFundamentalsRecord>, "id"> &
      Partial<Identifiable>
  ) {
    return await this.#companyFundamentalsRecord.create(country);
  }

  migration_create(
    company_fundamentals: Omit<EditableData<CompanyFundamentalsRecord>, "id"> &
      Partial<Identifiable>
  ) {
    const migration: TransactionOperation<
      DatabaseSchema,
      "company_fundamentals"
    > = {
      insert: {
        table: "company_fundamentals",
        record: company_fundamentals,
      },
    };

    return migration;
  }

  /**
   * Update company fundamentals:
   * - this depends entirely on the action and its values being passed in.
   */
  async update(id: string, action: ReturnType<typeof createAction>) {
    const current = await this.root.model.db.company_fundamentals.getFirst({
      filter: { id },
    });

    if (!current) {
      throw new Error(`Company
        Fundamentals with id ${id} not found
      `);
    }

    const game = await this.root.model.db.game.select(["difficulty"]).getFirst({
      filter: {
        company: {
          company_fundamentals: {
            id,
          },
        },
      },
    });

    if (!game) {
      throw new Error(`Game with company_fundamentals id ${id} not found`);
    }

    const value = ActionTypeEnum[action.type];

    const migration = await this.companyFundamentalActionMap[value](
      id,
      action.data,
      // @todo - secure this type
      game?.difficulty as DifficultyEnum
    );

    return await this.root.migrations_run([
      migration as TransactionOperation<DatabaseSchema, keyof DatabaseSchema>,
    ]);
  }
}
