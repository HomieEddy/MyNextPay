import { describe, expect, it } from "vitest";
import { calendarEvents, eventsByDate } from "./calendar-events";
import type { ScheduledItem } from "./occurrences";

const rent: ScheduledItem = {
  id: 1,
  name: "Rent",
  category: "Home",
  amount: 120000,
  schedule: { kind: "monthly", dayOfMonth: 1, startDate: "2026-01-01" },
  autoPay: false,
};

const base = {
  today: "2026-12-10",
  anchor: "2026-11-20",
  frequency: "biweekly" as const,
  payAmount: 215000,
  bills: [rent],
  incomes: [],
  paidKeys: new Set<string>(["1:2026-12-01"]),
};

describe("calendarEvents", () => {
  it("lists paydays and bills in date order", () => {
    const events = calendarEvents(base, "2026-12-01", "2026-12-31");
    expect(events.map((e) => `${e.date} ${e.kind}`)).toEqual([
      "2026-12-01 bill",
      "2026-12-04 pay",
      "2026-12-18 pay",
    ]);
  });

  it("marks bills paid from the paid keys, never paydays", () => {
    const [bill, pay] = calendarEvents(base, "2026-12-01", "2026-12-04");
    expect(bill.paid).toBe(true);
    expect(pay.paid).toBe(false);
  });

  it("groups events by date", () => {
    const grouped = eventsByDate(
      calendarEvents(base, "2026-12-01", "2026-12-31"),
    );
    expect(grouped.get("2026-12-04")?.[0].kind).toBe("pay");
    expect(grouped.has("2026-12-02")).toBe(false);
  });
});
