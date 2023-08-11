import { random } from "lodash";

export function randomBoolean(): boolean {
  return random() > 0.5;
}
