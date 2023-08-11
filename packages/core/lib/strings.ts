import { range } from "lodash";
import { randomValue } from "./arrays";
import { LETTERS } from "./letters";
import { randomLength } from "./utils";

export const NUMBERS = range(0, 9);

export type RandomStringOptions = {
  min?: number;
  max?: number;
  fixed?: number;
  mode?: "alpha" | "numeric" | "alphanumeric";
};

// export function randomString(options?: { min?: number; max?: number }): string;
// export function randomString(options?: { fixed?: number }): string;

export function randomString(options?: RandomStringOptions): string {
  let characters: string[];
  switch (options?.mode) {
    case "alpha":
      characters = [...LETTERS];
      break;
    case "numeric":
      characters = [...NUMBERS.map((number) => number.toString())];
      break;
    case "alphanumeric":
    default:
      characters = [...LETTERS, ...NUMBERS.map((number) => number.toString())];
      break;
  }

  const length = randomLength({
    min: options?.min,
    max: options?.max,
    defaultMin: 10,
    defaultMax: (min) => min + 10,
    fixed: options?.fixed,
  });

  return range(0, length)
    .map(() => randomValue(characters))
    .join("");
}
