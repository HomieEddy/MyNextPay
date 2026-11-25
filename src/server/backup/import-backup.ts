import type { Db } from "../db/client";
import { billPayment, entry, recurringItem, settings } from "../db/schema";
import type { Backup } from "./backup-schema";

/** Replaces all money data with the backup's, in one transaction. */
export function importBackup(db: Db, backup: Backup) {
  const { data } = backup;
  db.transaction((tx) => {
    tx.delete(billPayment).run();
    tx.delete(entry).run();
    tx.delete(recurringItem).run();
    tx.delete(settings).run();
    if (data.settings.length) tx.insert(settings).values(data.settings).run();
    if (data.recurringItems.length)
      tx.insert(recurringItem).values(data.recurringItems).run();
    if (data.billPayments.length)
      tx.insert(billPayment).values(data.billPayments).run();
    if (data.entries.length) tx.insert(entry).values(data.entries).run();
  });
}
