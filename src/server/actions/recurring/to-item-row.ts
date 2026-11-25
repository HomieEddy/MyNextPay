import type { RecurringOutput } from "@/lib/schemas/recurring";
import type { RecurringItemInput } from "../../repos/recurring-repo";

/** Keeps only the schedule fields the chosen schedule uses. The rest are stored as null. */
export function toItemRow(data: RecurringOutput): RecurringItemInput {
  const base = {
    kind: data.kind,
    name: data.name,
    category: data.category || "Other",
    amount: data.amount,
    startDate: data.startDate,
    autoPay: data.autoPay,
  };
  switch (data.scheduleKind) {
    case "weekly":
      return {
        ...base,
        scheduleKind: "weekly",
        weekday: data.weekday,
        everyWeeks: data.everyWeeks,
        dayOfMonth: null,
        everyDays: null,
      };
    case "monthly":
      return {
        ...base,
        scheduleKind: "monthly",
        weekday: null,
        everyWeeks: null,
        dayOfMonth: data.dayOfMonth,
        everyDays: null,
      };
    case "interval":
      return {
        ...base,
        scheduleKind: "interval",
        weekday: null,
        everyWeeks: null,
        dayOfMonth: null,
        everyDays: data.everyDays,
      };
  }
}
