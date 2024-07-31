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
import { ActionTypeEnum } from "..";
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

export class CompanyFundamentalsModel {
  #companyFundamentalsRecord: Repository<CompanyFundamentalsRecord>;
  root: Root;

  companyFundamentalActionMap: Record<
    ActionTypeEnum,
    (id: string, data: any) => Promise<UpdateMigration>
  > = {
    [ActionTypeEnum.TURN]: (id, data: IActionTurn) => this.handleTurn(id, data),
    [ActionTypeEnum.RESEARCH]: (id, data: IActionResearch) =>
      this.handleResearch(id, data),
    [ActionTypeEnum.INVEST]: (id, data: IActionInvest) =>
      this.handleInvest(id, data),
    [ActionTypeEnum.ACQUIRE]: (id, data: IActionAcquire) =>
      this.handleAcquire(id, data),
    [ActionTypeEnum.EXPAND]: (id, data: IActionExpand) =>
      this.handleExpand(id, data),
    [ActionTypeEnum.MARKETING]: (id, data: IActionMarketing) =>
      this.handleMarketing(id, data),
    [ActionTypeEnum.DONATE]: (id, data: IActionDonate) =>
      this.handleDonate(id, data),
    [ActionTypeEnum.PAY_FINE]: (id, data: IActionPayFine) =>
      this.handlePayFine(id, data),
    [ActionTypeEnum.BRIBE]: (id, data: IActionBribe) =>
      this.handleBribe(id, data),
    [ActionTypeEnum.ASSASSINATION]: (id, data: IActionAssassination) =>
      this.handleAssassination(id, data),
    [ActionTypeEnum.LOBBY]: (id, data: IActionLobby) =>
      this.handleLobby(id, data),
    [ActionTypeEnum.GO_PUBLIC]: (id, data: IActionGoPublic) =>
      this.handleGoPublic(id, data),
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
  async handleResearch(id: string, data: IActionResearch) {
    const cf = await this.get(id, [
      "technology",
      "expenses",
      "cash",
      "liabilities",
      "company_size",
    ]);

    const handler = new HandleFundamentals(id, "RESEARCH");

    handler.expenses({
      expenses: cf.expenses,
      amount: data.amount,
    });

    handler.technology({
      technology: cf.technology,
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

  async handleInvest(id: string, data: IActionInvest) {
    const cf = await this.get(id, [
      "technology",
      "assets",
      "cash",
      "net_profit",
      "expenses",
      "cash",
    ]);

    const handler = new HandleFundamentals(id, "INVEST");

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
  async handleAcquire(id: string, data: IActionAcquire) {
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
  async handleExpand(id: string, data: IActionExpand) {
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
  async handleMarketing(id: string, data: IActionMarketing) {
    const handler = new HandleFundamentals(id, "MARKETING");

    return handler.migration;
  }
  /**
   * @DONATE
   * domestic influence +
   * cash -
   * liabilities - (tax write-off)
   */
  async handleDonate(id: string, data: IActionDonate) {
    const handler = new HandleFundamentals(id, "DONATE");

    return handler.migration;
  }
  /**
   * @PAY_FINE
   * domestic influence -
   * cash -
   */
  async handlePayFine(id: string, data: IActionPayFine) {
    const handler = new HandleFundamentals(id, "PAY_FINE");

    return handler.migration;
  }
  /**
   * @BRIBE
   * domestic influence +
   * cash -
   */
  async handleBribe(id: string, data: IActionBribe) {
    const handler = new HandleFundamentals(id, "BRIBE");

    return handler.migration;
  }
  /**
   * @ASSASSINATION
   * domestic influence +
   * foreign influence +/-
   * cash -
   */
  async handleAssassination(id: string, data: IActionAssassination) {
    const handler = new HandleFundamentals(id, "ASSASSINATION");

    return handler.migration;
  }
  /**
   * @LOBBY
   * domestic influence +
   * cash -
   */
  async handleLobby(id: string, data: IActionLobby) {
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
  async handleGoPublic(id: string, data: IActionGoPublic) {
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

    const value = ActionTypeEnum[action.type];

    const migration = await this.companyFundamentalActionMap[value](
      id,
      action.data
    );

    return await this.root.migrations_run([
      migration as TransactionOperation<DatabaseSchema, keyof DatabaseSchema>,
    ]);
  }
}
