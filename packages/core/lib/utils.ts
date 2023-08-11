import { isNumber, random } from "lodash";

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
