import { randomLetter } from "../lib/letters";

describe("letters", () => {
  it("type of return", () => {
    const result = randomLetter();

    expect(result).toBeTypeOf("string");
    expect(result).toHaveLength(1);
  });

  it("forced uppercase", () => {
    const result = randomLetter({ case: "upper" });

    expect(result).toEqual(result.toUpperCase());
  });

  it("forced lowercase", () => {
    const result = randomLetter({ case: "lower" });

    expect(result).toEqual(result.toLowerCase());
  });

  it("return `c` when only letter", () => {
    const result = randomLetter({ letters: ["c"] });

    expect(result.toLowerCase()).toBe("c");
  });

  it("return `C` when only letter and forced uppercase", () => {
    const result = randomLetter({ case: "upper", letters: ["c"] });

    expect(result).toBe("C");
  });
});
