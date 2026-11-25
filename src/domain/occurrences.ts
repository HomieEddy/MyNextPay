import { type PayFrequency, paySchedule } from "./cycles";
import type { IsoDate } from "./dates";
import type { Cents } from "./money";
import { occurrencesBetween, type Schedule } from "./schedules";

export type ScheduledItem = {
  id: number;
  name: string;
  category: string;
  amount: Cents;
  schedule: Schedule;
  autoPay: boolean;
};

export type Occurrence = {
  itemId: number;
  name: string;
  category: string;
  amount: Cents;
  date: IsoDate;
  paid: boolean;
};

export function paidKey(itemId: number, date: IsoDate): string {
  return `${itemId}:${date}`;
}

export function occurrencesOf(
  items: ScheduledItem[],
  from: IsoDate,
  to: IsoDate,
  today: IsoDate,
  paidKeys: ReadonlySet<string>,
): Occurrence[] {
  return items.flatMap((item) =>
    occurrencesBetween(item.schedule, from, to).map((date) => ({
      itemId: item.id,
      name: item.name,
      category: item.category,
      amount: item.amount,
      date,
      paid:
        paidKeys.has(paidKey(item.id, date)) || (item.autoPay && date < today),
    })),
  );
}

/** The paycheck as a scheduled income, so pay is counted like any other income. */
export function paycheckItem(
  anchor: IsoDate,
  frequency: PayFrequency,
  amount: Cents,
): ScheduledItem {
  return {
    id: 0,
    name: "Paycheck",
    category: "Income",
    amount,
    schedule: paySchedule(anchor, frequency),
    autoPay: true,
  };
}
