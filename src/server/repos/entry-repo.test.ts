import { describe, expect, it } from "vitest";
import { createDb } from "../db/client";
import {
  deleteEntry,
  findEntry,
  insertEntries,
  listEntries,
  updateEntry,
} from "./entry-repo";

const brakes = {
  kind: "unexpected" as const,
  description: "Brakes",
  category: "Car",
  amount: 48000,
  date: "2026-11-25",
};

describe("entries", () => {
  it("updates and deletes one entry", () => {
    const db = createDb(":memory:");
    insertEntries(db, [brakes, { ...brakes, description: "Tires" }]);
    const [first, second] = listEntries(db);
    updateEntry(db, first.id, { ...brakes, amount: 52000 });
    expect(findEntry(db, first.id)?.amount).toBe(52000);
    deleteEntry(db, second.id);
    expect(listEntries(db)).toHaveLength(1);
  });
});
