export * from "./letter";
export * from "./number";
export * from "./options";

import { isNumber, random, range } from "lodash";
import { randomLetter } from "./letter";

export function randomLength(options: {
  min?: number;
  max?: number;
  defaultMin?: number;
  defaultMax?: (min: number) => number;
  fixed?: number;
}): number {
  if (isNumber(options.fixed)) return options.fixed;

  const min = options.min ?? options.defaultMin ?? 0;
  const max = options.max ?? options.defaultMax?.(min) ?? min + 100;

  return random(min, max);
}

export const Numbers = range(0, 9);

export function randomValue<T>(values: readonly T[]): T {
  return values[random(0, values.length - 1)];
}

export function randomBoolean(): boolean {
  return random() > 0.5;
}

export function randomString(options?: { min?: number; max?: number }): string;
export function randomString(options?: { fixed?: number }): string;

export function randomString(options?: {
  min?: number;
  max?: number;
  fixed?: number;
}): string {
  const length = randomLength({
    min: options?.min,
    max: options?.max,
    defaultMin: 10,
    defaultMax: (min) => min + 10,
    fixed: options?.fixed,
  });

  return range(0, length).reduce((acc) => {
    return `${acc}${randomLetter()}`;
  }, "");
}
