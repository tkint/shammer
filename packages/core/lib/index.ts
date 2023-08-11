export * from "./arrays";
export * from "./booleans";
export * from "./letters";
export * from "./numbers";
export * from "./objects";
export * from "./strings";
export * from "./utils";

export type ShammerOptions = {
  arrays: "random" | "empty" | "min" | "max" | "fixed" | number;
};

export function optionsOrDefault(
  options?: Partial<ShammerOptions>
): ShammerOptions {
  return {
    arrays: "empty",
    ...options,
  };
}
