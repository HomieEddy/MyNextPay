import type { CalendarEvent } from "@/domain/calendar-events";
import type { Cycle } from "@/domain/cycles";
import { type IsoDate, isBetween } from "@/domain/dates";
import { formatMoney } from "@/domain/money";
import type { GridDay } from "./calendar-grid";

export type CalendarCell = {
  date: IsoDate;
  day: number;
  className: string;
  dots: ("b" | "p" | "g")[];
  label: string;
};

export type EventRow = {
  key: string;
  name: string;
  detail: string;
  amount: string;
  color: string;
  income: boolean;
  paid: boolean;
};

type CellContext = { today: IsoDate; selected: IsoDate; cycle: Cycle | null };

function dotFor(event: CalendarEvent): "b" | "p" | "g" {
  if (event.kind !== "bill") return "g";
  return event.paid ? "p" : "b";
}

function cellClass(
  day: GridDay,
  events: CalendarEvent[],
  context: CellContext,
): string {
  const classes = ["day"];
  if (!day.inMonth) classes.push("out");
  if (day.date === context.today) classes.push("today");
  if (events.some((e) => e.kind === "pay")) classes.push("pay");
  if (
    context.cycle &&
    isBetween(day.date, context.cycle.start, context.cycle.end)
  )
    classes.push("cyc");
  if (day.date === context.selected) classes.push("sel");
  return classes.join(" ");
}

export function toCells(
  grid: GridDay[],
  byDate: Map<IsoDate, CalendarEvent[]>,
  context: CellContext,
): CalendarCell[] {
  return grid.map((day) => {
    const events = byDate.get(day.date) ?? [];
    return {
      date: day.date,
      day: day.day,
      className: cellClass(day, events, context),
      dots: events
        .filter((e) => e.kind !== "pay")
        .slice(0, 3)
        .map(dotFor),
      label:
        events.length > 0 ? `${day.date}, ${events.length} items` : day.date,
    };
  });
}

const STATE = { pay: "Paycheck", income: "Income", bill: "Bill" };

export function toEventRows(events: CalendarEvent[]): EventRow[] {
  return events.map((e) => {
    const bill = e.kind === "bill";
    return {
      key: `${e.kind}:${e.itemId}:${e.date}`,
      name: e.name,
      detail: bill ? (e.paid ? "Paid" : "Unpaid") : STATE[e.kind],
      amount: `${bill ? "" : "+"}${formatMoney(e.amount)}`,
      color: bill
        ? e.paid
          ? "var(--color-line)"
          : "var(--color-orange)"
        : "var(--color-green)",
      income: !bill,
      paid: bill && e.paid,
    };
  });
}
