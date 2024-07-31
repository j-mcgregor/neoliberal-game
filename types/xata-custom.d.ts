export type TransactionFailure = {
  /**
   * The request ID.
   */
  id: string;
  /**
   * An array of errors from the submitted operations.
   */
  errors: TransactionError[];
};

export type TransactionError = {
  /**
   * The index of the failing operation
   */
  index: number;
  /**
   * The error message
   */
  message: string;
};

// Extract from T those types that are assignable to U
export type StringKeys<O> = Extract<keyof O, string>;

// Extract the update operation from the transaction operation
export type UpdateOperationType<
  Schemas extends Record<string, BaseData>,
  Tables extends StringKeys<Schemas>
> = Extract<TransactionOperation<Schemas, Tables>, { update: any }>["update"];

export type UpdateMigrationType = UpdateOperationType<
  Record<string, CompanyFundamentalsRecord>,
  keyof DatabaseSchema
>;

export type UpdateMigration = {
  update: UpdateMigrationType;
};
