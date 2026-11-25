import type { PayFrequency } from "./cycles";
import type { IsoDate } from "./dates";
import type { Cents } from "./money";
import { occurrencesOf, paycheckItem, type ScheduledItem } from "./occurrences";

export type CalendarEvent = {
  itemId: number;
  date: IsoDate;
  name: string;
  amount: Cents;
  kind: "pay" | "income" | "bill";
  paid: boolean;
};

export type CalendarInput = {
  today: IsoDate;
  anchor: IsoDate;
  frequency: PayFrequency;
  payAmount: Cents;
  bills: ScheduledItem[];
  incomes: ScheduledItem[];
  paidKeys: ReadonlySet<string>;
};

/** Every payday, income and bill due between two dates, in date order. */
export function calendarEvents(
  input: CalendarInput,
  from: IsoDate,
  to: IsoDate,
): CalendarEvent[] {
  const { today, paidKeys } = input;
  const pay = paycheckItem(input.anchor, input.frequency, input.payAmount);
  const tagged = (items: ScheduledItem[], kind: CalendarEvent["kind"]) =>
    occurrencesOf(items, from, to, today, paidKeys).map((o) => ({
      itemId: o.itemId,
      date: o.date,
      name: o.name,
      amount: o.amount,
      kind,
      paid: kind === "bill" && o.paid,
    }));
  const events = [
    ...tagged([pay], "pay"),
    ...tagged(input.incomes, "income"),
    ...tagged(input.bills, "bill"),
  ];
  return events.sort((a, b) => a.date.localeCompare(b.date));
}

/** Groups events by their date. */
export function eventsByDate(
  events: CalendarEvent[],
): Map<IsoDate, CalendarEvent[]> {
  const byDate = new Map<IsoDate, CalendarEvent[]>();
  for (const event of events)
    byDate.set(event.date, [...(byDate.get(event.date) ?? []), event]);
  return byDate;
}
