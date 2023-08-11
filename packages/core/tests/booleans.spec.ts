import { randomBoolean } from "../lib/booleans";

describe("booleans", () => {
  it("type of return", () => {
    expect(randomBoolean()).toBeTypeOf("boolean");
  });
});
