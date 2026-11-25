import { getDay } from "date-fns";
import type { IsoDate } from "@/domain/dates";
import { toDate } from "@/domain/dates";
import type { RecurringItem } from "@/server/repos/recurring-repo";
import { centsToText } from "./money-text";
import type { RecurringInput } from "./schemas/recurring";

/** A new bill or income, starting today and repeating monthly. */
export function blankRecurringInput(
  kind: "bill" | "income",
  today: IsoDate,
): RecurringInput {
  const date = toDate(today);
  return {
    kind,
    name: "",
    category: "",
    amount: "",
    scheduleKind: "monthly",
    weekday: getDay(date),
    everyWeeks: 1,
    dayOfMonth: date.getDate(),
    everyDays: 30,
    startDate: today,
    autoPay: true,
  };
}

/** The form values for an existing recurring item. */
export function toRecurringInput(row: RecurringItem): RecurringInput {
  return {
    id: row.id,
    kind: row.kind,
    name: row.name,
    category: row.category,
    amount: centsToText(row.amount),
    scheduleKind: row.scheduleKind,
    weekday: row.weekday ?? 1,
    everyWeeks: row.everyWeeks ?? 1,
    dayOfMonth: row.dayOfMonth ?? 1,
    everyDays: row.everyDays ?? 30,
    startDate: row.startDate,
    autoPay: row.autoPay,
  };
}
