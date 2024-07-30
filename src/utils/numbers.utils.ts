/**
 * function to check a value is a number, 0 included
 */

export function isNumber(value: any): value is number {
  return typeof value === "number";
}
