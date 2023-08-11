import { randomNumber } from "../lib/numbers";

describe("numbers", () => {
  it("type of return", () => {
    expect(randomNumber()).toBeTypeOf("number");
  });
});
