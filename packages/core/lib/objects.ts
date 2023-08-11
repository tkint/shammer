import { merge } from "lodash";
import { indexedFn } from "./utils";

export function builderOf<T>(defaultValue: (index: number) => T) {
  return (value?: Partial<T>) => merge(indexedFn(defaultValue), value);
}
