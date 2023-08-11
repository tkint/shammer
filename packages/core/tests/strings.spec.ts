import { randomString } from "../lib/strings";

describe("strings", () => {
  it("type of return", () => {
    expect(randomString()).toBeTypeOf("string");
  });

  it("fixed length", () => {
    expect(randomString({ fixed: 10 })).toHaveLength(10);
  });
});
