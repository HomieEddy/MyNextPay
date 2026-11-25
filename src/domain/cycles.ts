import { addMonths, addWeeks, differenceInCalendarMonths } from "date-fns";
import { addDays, daysBetween, type IsoDate, toDate, toIsoDate } from "./dates";

export type PayFrequency = "weekly" | "biweekly" | "monthly";

export type Cycle = {
  start: IsoDate;
  end: IsoDate;
  nextPayday: IsoDate;
  lengthDays: number;
};

/** The payday `count` periods away from the anchor. Monthly paydays never drift. */
export function shiftPayday(
  anchor: IsoDate,
  frequency: PayFrequency,
  count: number,
): IsoDate {
  const date = toDate(anchor);
  if (frequency === "monthly") return toIsoDate(addMonths(date, count));
  const weeks = frequency === "weekly" ? count : count * 2;
  return toIsoDate(addWeeks(date, weeks));
}

function estimatePeriods(
  anchor: IsoDate,
  frequency: PayFrequency,
  day: IsoDate,
): number {
  if (frequency === "monthly") {
    return differenceInCalendarMonths(toDate(day), toDate(anchor));
  }
  const length = frequency === "weekly" ? 7 : 14;
  return Math.floor(daysBetween(anchor, day) / length);
}

/** Index of the pay period that contains `day` (0 = the one starting on the anchor). */
function periodIndex(
  anchor: IsoDate,
  frequency: PayFrequency,
  day: IsoDate,
): number {
  let index = estimatePeriods(anchor, frequency, day);
  while (shiftPayday(anchor, frequency, index) > day) index--;
  while (shiftPayday(anchor, frequency, index + 1) <= day) index++;
  return index;
}

/** The cycle containing `day`, moved by `offset` cycles (-1 = previous, 1 = next). */
export function cycleFor(
  anchor: IsoDate,
  frequency: PayFrequency,
  day: IsoDate,
  offset = 0,
): Cycle {
  const index = periodIndex(anchor, frequency, day) + offset;
  const start = shiftPayday(anchor, frequency, index);
  const nextPayday = shiftPayday(anchor, frequency, index + 1);
  return {
    start,
    end: addDays(nextPayday, -1),
    nextPayday,
    lengthDays: daysBetween(start, nextPayday),
  };
}

/** Days from `day` until the next payday. */
export function daysLeft(cycle: Cycle, day: IsoDate): number {
  return daysBetween(day, cycle.nextPayday);
}
