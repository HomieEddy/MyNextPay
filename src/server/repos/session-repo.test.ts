import { beforeEach, describe, expect, it } from "vitest";
import { createDb, type Db } from "../db/client";
import {
  deleteExpiredSessions,
  deleteSession,
  findSession,
  insertSession,
} from "./session-repo";

describe("session repo", () => {
  let db: Db;
  beforeEach(() => {
    db = createDb(":memory:");
  });

  it("stores, finds and deletes a session", () => {
    insertSession(db, "abc", 1000);
    expect(findSession(db, "abc")?.expiresAt).toBe(1000);
    deleteSession(db, "abc");
    expect(findSession(db, "abc")).toBeUndefined();
  });

  it("clears expired sessions only", () => {
    insertSession(db, "old", 100);
    insertSession(db, "new", 900);
    deleteExpiredSessions(db, 500);
    expect(findSession(db, "old")).toBeUndefined();
    expect(findSession(db, "new")).toBeDefined();
  });
});
