import { z } from "zod";
import { builderOf, scham, schamArrayOf, schamString } from "../lib";

enum BookType {
  BOOK = "BOOK",
  NOVEL = "NOVEL",
}

const Book = z.object({
  title: z.string(),
  type: z.nativeEnum(BookType),
});

type Book = z.infer<typeof Book>;

const User = z.object({
  firstname: z.string(),
  lastname: z.string().optional().optional(),
  age: z.number(),
  address: z
    .object({
      street: z.string(),
      zipCode: z.string(),
      country: z.enum(["FR", "ES", "DE", "IT"]),
    })
    .optional(),
  books: z.array(Book).min(1).max(5),
});

type User = z.infer<typeof User>;

describe("", () => {
  it("", () => {
    const user = scham(User);

    const aa = scham(z.array(z.nativeEnum(BookType)).length(10), {
      arrays: "random",
    });

    expect(aa).toHaveLength(10);

    const book: Book = {
      title: schamString(z.string()),
      type: BookType.BOOK,
    };

    const buildUser = builderOf(User, { arrays: 0 });

    const u = buildUser((options) => ({
      firstname: "Hello",
      books: schamArrayOf(Book, { arrays: "empty" }),
    }));
  });
});
