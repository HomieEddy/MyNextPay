import type { Db } from "../db/client";
import { billPayment, entry, recurringItem, settings } from "../db/schema";

/** Removes all money data. Keeps the user and their sessions. */
export function deleteAllData(db: Db) {
  db.transaction((tx) => {
    tx.delete(billPayment).run();
    tx.delete(entry).run();
    tx.delete(recurringItem).run();
    tx.delete(settings).run();
  });
}
