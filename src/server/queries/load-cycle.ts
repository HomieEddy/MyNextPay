import "server-only";
import {
  type CycleSummary,
  computeCycle,
  type LedgerEntry,
  paidKey,
} from "@/domain/cycle-summary";
import type { Db } from "../db/client";
import { listBillPayments } from "../repos/bill-payment-repo";
import { listEntries } from "../repos/entry-repo";
import { listRecurringItems } from "../repos/recurring-repo";
import { findSettings } from "../repos/settings-repo";
import { appToday } from "../today";
import { toScheduledItem } from "./to-scheduled-item";

/** The cycle `offset` away from today, or null before setup is finished. */
export function loadCycle(db: Db, offset: number): CycleSummary | null {
  const settings = findSettings(db);
  if (!settings) return null;

  const rows = listRecurringItems(db);
  const entries: LedgerEntry[] = listEntries(db).map((e) => ({
    kind: e.kind,
    amount: e.amount,
    date: e.date,
  }));
  const paidKeys = new Set(
    listBillPayments(db).map((p) => paidKey(p.itemId, p.dueDate)),
  );

  return computeCycle({
    today: appToday(),
    offset,
    anchor: settings.anchorPayday,
    frequency: settings.payFrequency,
    payAmount: settings.payAmount,
    mode: settings.mode,
    openingBalance: settings.openingBalance,
    openingBalanceDate: settings.openingBalanceDate,
    floor: settings.floor,
    bills: rows.filter((r) => r.kind === "bill").map(toScheduledItem),
    incomes: rows.filter((r) => r.kind === "income").map(toScheduledItem),
    entries,
    paidKeys,
  });
}
