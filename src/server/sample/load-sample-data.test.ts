import { describe, expect, it } from "vitest";
import { createDb } from "../db/client";
import { listEntries } from "../repos/entry-repo";
import { listRecurringItems } from "../repos/recurring-repo";
import { findSettings } from "../repos/settings-repo";
import { loadSampleData } from "./load-sample-data";
import { SAMPLE_ENTRIES, SAMPLE_RECURRING } from "./sample-data";

describe("loadSampleData", () => {
  it("fills an empty database", () => {
    const db = createDb(":memory:");
    loadSampleData(db);
    expect(findSettings(db)?.payAmount).toBe(215000);
    expect(listRecurringItems(db)).toHaveLength(SAMPLE_RECURRING.length);
    expect(listEntries(db)).toHaveLength(SAMPLE_ENTRIES.length);
  });

  it("replaces existing data instead of duplicating it", () => {
    const db = createDb(":memory:");
    loadSampleData(db);
    loadSampleData(db);
    expect(listRecurringItems(db)).toHaveLength(SAMPLE_RECURRING.length);
  });
});
