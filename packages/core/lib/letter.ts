import { randomBoolean, randomValue } from "./index";

export const Letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
] as const;
export type Letter = (typeof Letters)[number];

export function randomLetter<
  TCase extends "random" | "upper" | "lower",
  TLetter extends Letter
>(options?: {
  case?: TCase;
  letters?: [TLetter, ...TLetter[]];
}): TCase extends undefined | "random"
  ? TLetter | Uppercase<TLetter>
  : TCase extends "upper"
  ? Uppercase<TLetter>
  : TLetter;

export function randomLetter(options?: {
  case?: "upper" | "lower" | "random";
  letters?: Letter[];
}) {
  const optLetters = options?.letters ?? Letters;
  const optCase = options?.case ?? randomValue(["upper", "lower", "random"]);

  const letter = randomValue(optLetters);

  switch (optCase) {
    case "upper":
      return letter.toUpperCase();
    case "lower":
      return letter.toLowerCase();
    case "random":
      if (randomBoolean()) return letter.toUpperCase();
      else return letter.toLowerCase();
  }
}
