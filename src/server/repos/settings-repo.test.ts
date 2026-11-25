import { beforeEach, describe, expect, it } from "vitest";
import { createDb, type Db } from "../db/client";
import { findSettings, saveSettings } from "./settings-repo";

const base = {
  anchorPayday: "2026-11-06",
  payFrequency: "biweekly",
  payAmount: 215000,
} as const;

describe("settings repo", () => {
  let db: Db;
  beforeEach(() => {
    db = createDb(":memory:");
  });

  it("saves with defaults", () => {
    saveSettings(db, base);
    expect(findSettings(db)).toMatchObject({
      ...base,
      mode: "simple",
      floor: 30000,
    });
  });

  it("updates the existing row", () => {
    saveSettings(db, base);
    saveSettings(db, { ...base, mode: "ledger", floor: 50000 });
    expect(findSettings(db)).toMatchObject({ mode: "ledger", floor: 50000 });
  });
});
