import { describe, expect, it } from "vitest";
import { createDb } from "../db/client";
import { listEntries } from "../repos/entry-repo";
import { findSettings } from "../repos/settings-repo";
import { loadSampleData } from "../sample/load-sample-data";
import { backupSchema } from "./backup-schema";
import { exportBackup } from "./export-backup";
import { importBackup } from "./import-backup";

describe("backup", () => {
  it("round-trips every money table", () => {
    const source = createDb(":memory:");
    loadSampleData(source);
    const file = JSON.parse(
      JSON.stringify(exportBackup(source, "2026-11-25T12:00:00Z")),
    );
    const parsed = backupSchema.parse(file);

    const target = createDb(":memory:");
    importBackup(target, parsed);
    expect(exportBackup(target, "2026-11-25T12:00:00Z")).toEqual(parsed);
    expect(findSettings(target)).toEqual(findSettings(source));
    expect(listEntries(target)).toHaveLength(listEntries(source).length);
  });

  it("rejects a file from another version", () => {
    const file = { version: 2, exportedAt: "", data: {} };
    expect(backupSchema.safeParse(file).success).toBe(false);
  });
});
