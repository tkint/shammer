import { random } from "lodash";

export function randomNumber(options?: { min?: number; max?: number }): number {
  const minValue = options?.min ?? 0;
  const maxValue = options?.max ?? minValue + 100;

  return random(minValue, maxValue);
}
