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
