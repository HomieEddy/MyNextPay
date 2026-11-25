import type { Db } from "../db/client";
import { billPayment, entry, recurringItem, settings } from "../db/schema";
import type { Backup } from "./backup-schema";

/** Every money table as one versioned object. */
export function exportBackup(db: Db, exportedAt: string): Backup {
  return {
    version: 1,
    exportedAt,
    data: {
      settings: db.select().from(settings).all(),
      recurringItems: db.select().from(recurringItem).all(),
      billPayments: db.select().from(billPayment).all(),
      entries: db.select().from(entry).all(),
    },
  };
}
