import "server-only";
import { type LedgerEntry, paidKey } from "@/domain/cycle-summary";
import type { Db } from "../db/client";
import { listBillPayments } from "../repos/bill-payment-repo";
import { listEntries } from "../repos/entry-repo";
import { listRecurringItems } from "../repos/recurring-repo";
import { findSettings } from "../repos/settings-repo";
import { toScheduledItem } from "./to-scheduled-item";

/** Everything the cycle and calendar math needs, or null before setup is finished. */
export function loadSchedule(db: Db) {
  const settings = findSettings(db);
  if (!settings) return null;

  const rows = listRecurringItems(db);
  const entries: LedgerEntry[] = listEntries(db).map((e) => ({
    kind: e.kind,
    amount: e.amount,
    date: e.date,
  }));
  return {
    settings,
    bills: rows.filter((r) => r.kind === "bill").map(toScheduledItem),
    incomes: rows.filter((r) => r.kind === "income").map(toScheduledItem),
    entries,
    paidKeys: new Set(
      listBillPayments(db).map((p) => paidKey(p.itemId, p.dueDate)),
    ),
  };
}
