import { random } from "lodash";

export function randomValue<T>(values: readonly T[]): T {
  return values[random(0, values.length - 1)];
}
