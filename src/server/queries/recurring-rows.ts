import "server-only";
import { addDays, type IsoDate } from "@/domain/dates";
import { describeSchedule } from "@/domain/describe-schedule";
import { formatMoney } from "@/domain/money";
import { occurrencesBetween } from "@/domain/schedules";
import { shortDate } from "@/lib/format-date";
import type { RecurringItem } from "../repos/recurring-repo";
import { toSchedule } from "./to-scheduled-item";

export type RecurringRow = {
  id: number;
  name: string;
  meta: string;
  amount: string;
  autoPay: boolean;
};

export function toRecurringRow(
  row: RecurringItem,
  today: IsoDate,
): RecurringRow {
  const schedule = toSchedule(row);
  const [next] = occurrencesBetween(schedule, today, addDays(today, 400));
  const nextText = next ? ` · next ${shortDate(next)}` : "";
  return {
    id: row.id,
    name: row.name,
    meta: `${describeSchedule(schedule)}${nextText}`,
    amount: formatMoney(row.amount),
    autoPay: row.autoPay,
  };
}
