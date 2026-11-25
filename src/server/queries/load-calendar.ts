import "server-only";
import { type CalendarEvent, calendarEvents } from "@/domain/calendar-events";
import type { IsoDate } from "@/domain/dates";
import type { Db } from "../db/client";
import { appToday } from "../today";
import { loadSchedule } from "./load-schedule";

/** Paydays, income and bills due between two dates, or null before setup. */
export function loadCalendar(
  db: Db,
  from: IsoDate,
  to: IsoDate,
): CalendarEvent[] | null {
  const schedule = loadSchedule(db);
  if (!schedule) return null;

  const { settings } = schedule;
  const input = {
    today: appToday(),
    anchor: settings.anchorPayday,
    frequency: settings.payFrequency,
    payAmount: settings.payAmount,
    bills: schedule.bills,
    incomes: schedule.incomes,
    paidKeys: schedule.paidKeys,
  };
  return calendarEvents(input, from, to);
}
