export type Options = {
  arrays: "random" | "empty" | "min" | "max" | "fixed" | number;
};

export function getOptions(options?: Partial<Options>): Options {
  return {
    arrays: "empty",
    ...options,
  };
}
