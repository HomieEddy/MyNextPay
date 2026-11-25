import {
  addMonths,
  endOfMonth,
  format,
  getDay,
  parse,
  startOfMonth,
} from "date-fns";
import { addDays, type IsoDate, toDate, toIsoDate } from "@/domain/dates";

export type GridDay = { date: IsoDate; day: number; inMonth: boolean };

const MONTH = /^\d{4}-\d{2}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** "yyyy-mm" from a search param, or the month of `fallback`. */
export function parseMonth(value: unknown, fallback: IsoDate): string {
  return typeof value === "string" && MONTH.test(value)
    ? value
    : fallback.slice(0, 7);
}

/** A "yyyy-mm-dd" search param, or `fallback`. */
export function parseDay(value: unknown, fallback: IsoDate): IsoDate {
  return typeof value === "string" && DAY.test(value) ? value : fallback;
}

export function shiftMonth(month: string, count: number): string {
  return format(
    addMonths(parse(month, "yyyy-MM", new Date()), count),
    "yyyy-MM",
  );
}

export function monthTitle(month: string): string {
  return format(parse(month, "yyyy-MM", new Date()), "MMMM yyyy");
}

/** Whole weeks, Sunday to Saturday, covering the month. */
export function monthGrid(month: string): GridDay[] {
  const first = startOfMonth(parse(month, "yyyy-MM", new Date()));
  const start = addDays(toIsoDate(first), -getDay(first));
  const last = toIsoDate(endOfMonth(first));
  const count = Math.ceil((getDay(first) + toDate(last).getDate()) / 7) * 7;
  return Array.from({ length: count }, (_, i) => {
    const date = addDays(start, i);
    return {
      date,
      day: toDate(date).getDate(),
      inMonth: date.startsWith(month),
    };
  });
}

/** The Sunday-to-Saturday week containing `day`. */
export function weekOf(day: IsoDate): IsoDate[] {
  const start = addDays(day, -getDay(toDate(day)));
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
