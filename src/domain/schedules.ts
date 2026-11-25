import { getDay, lastDayOfMonth } from "date-fns";
import { addDays, daysBetween, type IsoDate, toDate, toIsoDate } from "./dates";

export type Schedule =
  | { kind: "weekly"; weekday: number; everyWeeks: number; startDate: IsoDate }
  | { kind: "monthly"; dayOfMonth: number; startDate: IsoDate }
  | { kind: "interval"; everyDays: number; startDate: IsoDate };

/** Every date the schedule falls on between `from` and `to`, both included. */
export function occurrencesBetween(
  schedule: Schedule,
  from: IsoDate,
  to: IsoDate,
): IsoDate[] {
  if (schedule.kind === "monthly") return monthlyDates(schedule, from, to);
  if (schedule.kind === "weekly") {
    const first = nextWeekday(schedule.startDate, schedule.weekday);
    return steppedDates(first, schedule.everyWeeks * 7, from, to);
  }
  return steppedDates(schedule.startDate, schedule.everyDays, from, to);
}

function nextWeekday(day: IsoDate, weekday: number): IsoDate {
  const gap = (weekday - getDay(toDate(day)) + 7) % 7;
  return addDays(day, gap);
}

function steppedDates(
  first: IsoDate,
  step: number,
  from: IsoDate,
  to: IsoDate,
): IsoDate[] {
  if (step < 1) return [];
  const skip = Math.max(0, Math.ceil(daysBetween(first, from) / step));
  const dates: IsoDate[] = [];
  for (
    let day = addDays(first, skip * step);
    day <= to;
    day = addDays(day, step)
  ) {
    dates.push(day);
  }
  return dates;
}

/** The given day of a month, or the month's last day when it is shorter. */
function dayInMonth(year: number, month: number, dayOfMonth: number): IsoDate {
  const last = lastDayOfMonth(new Date(year, month, 1)).getDate();
  return toIsoDate(new Date(year, month, Math.min(dayOfMonth, last)));
}

function monthlyDates(
  schedule: Extract<Schedule, { kind: "monthly" }>,
  from: IsoDate,
  to: IsoDate,
): IsoDate[] {
  const start = from > schedule.startDate ? from : schedule.startDate;
  const cursor = toDate(start);
  const dates: IsoDate[] = [];
  for (let m = 0; ; m++) {
    const date = dayInMonth(
      cursor.getFullYear(),
      cursor.getMonth() + m,
      schedule.dayOfMonth,
    );
    if (date > to) return dates;
    if (date >= start) dates.push(date);
  }
}
