import { describe, expect, it } from "vitest";
import { cycleFor, daysLeft, shiftPayday } from "./cycles";

describe("cycleFor", () => {
  it("finds the biweekly cycle containing today", () => {
    const cycle = cycleFor("2026-11-06", "biweekly", "2026-11-25");
    expect(cycle).toEqual({
      start: "2026-11-20",
      end: "2026-12-03",
      nextPayday: "2026-12-04",
      lengthDays: 14,
    });
    expect(daysLeft(cycle, "2026-11-25")).toBe(9);
  });

  it("treats payday itself as the first day of the new cycle", () => {
    expect(cycleFor("2026-11-06", "biweekly", "2026-12-04").start).toBe(
      "2026-12-04",
    );
    expect(cycleFor("2026-11-06", "biweekly", "2026-12-03").start).toBe(
      "2026-11-20",
    );
  });

  it("works for dates before the anchor", () => {
    expect(cycleFor("2026-11-06", "biweekly", "2026-11-01").start).toBe(
      "2026-10-23",
    );
  });

  it("moves to previous and next cycles", () => {
    expect(cycleFor("2026-11-06", "biweekly", "2026-11-25", -1).start).toBe(
      "2026-11-06",
    );
    expect(cycleFor("2026-11-06", "biweekly", "2026-11-25", 1).start).toBe(
      "2026-12-04",
    );
  });

  it("handles weekly pay", () => {
    const cycle = cycleFor("2026-11-06", "weekly", "2026-11-25");
    expect(cycle.start).toBe("2026-11-20");
    expect(cycle.lengthDays).toBe(7);
  });

  it("crosses a year boundary", () => {
    const cycle = cycleFor("2026-12-25", "biweekly", "2027-01-03");
    expect(cycle).toMatchObject({ start: "2026-12-25", end: "2027-01-07" });
  });

  it("keeps monthly paydays on their day, clamping short months", () => {
    expect(shiftPayday("2026-01-31", "monthly", 1)).toBe("2026-02-28");
    expect(shiftPayday("2026-01-31", "monthly", 2)).toBe("2026-03-31");
    const february = cycleFor("2026-01-31", "monthly", "2026-03-15");
    expect(february).toMatchObject({
      start: "2026-02-28",
      nextPayday: "2026-03-31",
      lengthDays: 31,
    });
  });

  it("handles leap years for monthly pay", () => {
    expect(shiftPayday("2028-01-30", "monthly", 1)).toBe("2028-02-29");
  });
});
