import type { ActionMap } from "../../../types";

// Create a function that returns the correct action type based on the input
export function createAction<T extends keyof ActionMap>(
  type: T,
  data: Omit<ActionMap[T], "type">
): ActionMap[T] {
  return {
    type,
    data,
  } as ActionMap[T];
}
