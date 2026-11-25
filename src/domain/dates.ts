import {
  addDays as addDaysToDate,
  differenceInCalendarDays,
  format,
  parseISO,
} from "date-fns";

/** A calendar day as "yyyy-mm-dd". No time, no time zone. */
export type IsoDate = string;

export function toDate(day: IsoDate): Date {
  return parseISO(day);
}

export function toIsoDate(date: Date): IsoDate {
  return format(date, "yyyy-MM-dd");
}

export function addDays(day: IsoDate, days: number): IsoDate {
  return toIsoDate(addDaysToDate(toDate(day), days));
}

export function daysBetween(from: IsoDate, to: IsoDate): number {
  return differenceInCalendarDays(toDate(to), toDate(from));
}

export function isBetween(day: IsoDate, start: IsoDate, end: IsoDate): boolean {
  return day >= start && day <= end;
}

/** Today's date in the given time zone. */
export function today(timeZone: string, now: Date = new Date()): IsoDate {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(now);
}
