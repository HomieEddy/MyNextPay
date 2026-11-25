import type { ScheduledItem } from "@/domain/cycle-summary";
import type { Schedule } from "@/domain/schedules";
import type { RecurringItem } from "../repos/recurring-repo";

export function toSchedule(row: RecurringItem): Schedule {
  switch (row.scheduleKind) {
    case "weekly":
      return {
        kind: "weekly",
        weekday: row.weekday ?? 1,
        everyWeeks: row.everyWeeks ?? 1,
        startDate: row.startDate,
      };
    case "monthly":
      return {
        kind: "monthly",
        dayOfMonth: row.dayOfMonth ?? 1,
        startDate: row.startDate,
      };
    case "interval":
      return {
        kind: "interval",
        everyDays: row.everyDays ?? 30,
        startDate: row.startDate,
      };
  }
}

export function toScheduledItem(row: RecurringItem): ScheduledItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    amount: row.amount,
    autoPay: row.autoPay,
    schedule: toSchedule(row),
  };
}
