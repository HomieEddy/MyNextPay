import { beforeEach, describe, expect, it } from "vitest";
import { createDb, type Db } from "../db/client";
import { createUser, findUser, userExists } from "./user-repo";

describe("user repo", () => {
  let db: Db;
  beforeEach(() => {
    db = createDb(":memory:");
  });

  it("starts with no user", () => {
    expect(userExists(db)).toBe(false);
  });

  it("creates the single user", () => {
    createUser(db, { name: "Eddy", passwordHash: "hash" });
    expect(findUser(db)).toMatchObject({
      id: 1,
      name: "Eddy",
      passwordHash: "hash",
    });
  });

  it("refuses a second user", () => {
    createUser(db, { name: "A", passwordHash: "x" });
    expect(() => createUser(db, { name: "B", passwordHash: "y" })).toThrow();
  });
});
