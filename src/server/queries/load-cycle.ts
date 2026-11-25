import "server-only";
import { type CycleSummary, computeCycle } from "@/domain/cycle-summary";
import type { Db } from "../db/client";
import { appToday } from "../today";
import { loadSchedule } from "./load-schedule";

/** The cycle `offset` away from today, or null before setup is finished. */
export function loadCycle(db: Db, offset: number): CycleSummary | null {
  const schedule = loadSchedule(db);
  if (!schedule) return null;

  const { settings } = schedule;
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
    bills: schedule.bills,
    incomes: schedule.incomes,
    entries: schedule.entries,
    paidKeys: schedule.paidKeys,
  });
}
