import type { Schedule } from "./schedules";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function ordinal(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd" };
  return `${n}${suffixes[n % 10] ?? "th"}`;
}

export function describeSchedule(schedule: Schedule): string {
  switch (schedule.kind) {
    case "monthly":
      return `Monthly on the ${ordinal(schedule.dayOfMonth)}`;
    case "weekly": {
      const day = WEEKDAYS[schedule.weekday] ?? "";
      return schedule.everyWeeks === 1
        ? `Every ${day}`
        : `Every ${schedule.everyWeeks} weeks on ${day}`;
    }
    case "interval":
      return `Every ${schedule.everyDays} days`;
  }
}
