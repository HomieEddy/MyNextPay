import type { Db } from "../db/client";
import { insertEntries } from "../repos/entry-repo";
import { insertRecurringItems } from "../repos/recurring-repo";
import { deleteAllData } from "../repos/reset-repo";
import { saveSettings } from "../repos/settings-repo";
import {
  SAMPLE_ENTRIES,
  SAMPLE_RECURRING,
  SAMPLE_SETTINGS,
} from "./sample-data";

/** Replaces all money data with the sample set. */
export function loadSampleData(db: Db) {
  deleteAllData(db);
  saveSettings(db, SAMPLE_SETTINGS);
  insertRecurringItems(db, SAMPLE_RECURRING);
  insertEntries(db, SAMPLE_ENTRIES);
}
