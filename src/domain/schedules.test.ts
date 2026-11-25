import { describe, expect, it } from "vitest";
import { occurrencesBetween } from "./schedules";

describe("monthly schedules", () => {
  it("falls on the same day every month", () => {
    const rent = {
      kind: "monthly",
      dayOfMonth: 1,
      startDate: "2026-01-01",
    } as const;
    expect(occurrencesBetween(rent, "2026-11-20", "2026-12-03")).toEqual([
      "2026-12-01",
    ]);
  });

  it("uses the last day in shorter months", () => {
    const bill = {
      kind: "monthly",
      dayOfMonth: 31,
      startDate: "2026-01-01",
    } as const;
    expect(occurrencesBetween(bill, "2026-02-01", "2026-04-30")).toEqual([
      "2026-02-28",
      "2026-03-31",
      "2026-04-30",
    ]);
  });

  it("never falls before its start date", () => {
    const bill = {
      kind: "monthly",
      dayOfMonth: 15,
      startDate: "2026-11-20",
    } as const;
    expect(occurrencesBetween(bill, "2026-11-01", "2026-12-31")).toEqual([
      "2026-12-15",
    ]);
  });
});

describe("weekly schedules", () => {
  it("repeats on a weekday every few weeks", () => {
    const gym = {
      kind: "weekly",
      weekday: 1,
      everyWeeks: 4,
      startDate: "2026-11-09",
    } as const;
    expect(occurrencesBetween(gym, "2026-11-01", "2026-12-31")).toEqual([
      "2026-11-09",
      "2026-12-07",
    ]);
  });

  it("starts on the first matching weekday after the start date", () => {
    const item = {
      kind: "weekly",
      weekday: 5,
      everyWeeks: 1,
      startDate: "2026-11-25",
    } as const;
    expect(occurrencesBetween(item, "2026-11-25", "2026-12-05")).toEqual([
      "2026-11-27",
      "2026-12-04",
    ]);
  });
});

describe("interval schedules", () => {
  it("repeats every N days from the start date", () => {
    const water = {
      kind: "interval",
      everyDays: 60,
      startDate: "2026-10-15",
    } as const;
    expect(occurrencesBetween(water, "2026-11-01", "2027-02-28")).toEqual([
      "2026-12-14",
      "2027-02-12",
    ]);
  });

  it("returns nothing for an invalid interval", () => {
    const broken = {
      kind: "interval",
      everyDays: 0,
      startDate: "2026-10-15",
    } as const;
    expect(occurrencesBetween(broken, "2026-11-01", "2026-12-31")).toEqual([]);
  });
});
