import { describe, expect, it } from "vitest";
import {
  monthGrid,
  parseDay,
  parseMonth,
  shiftMonth,
  weekOf,
} from "./calendar-grid";

describe("monthGrid", () => {
  it("covers December 2026 in whole weeks starting on Sunday", () => {
    const grid = monthGrid("2026-12");
    expect(grid[0]).toEqual({ date: "2026-11-29", day: 29, inMonth: false });
    expect(grid).toHaveLength(35);
    expect(grid.at(-1)?.date).toBe("2027-01-02");
  });

  it("handles February in a leap year", () => {
    const grid = monthGrid("2028-02");
    expect(grid.filter((d) => d.inMonth)).toHaveLength(29);
  });
});

describe("calendar params", () => {
  it("falls back to today's month and day", () => {
    expect(parseMonth(undefined, "2026-11-25")).toBe("2026-11");
    expect(parseMonth("2026-13x", "2026-11-25")).toBe("2026-11");
    expect(parseDay("2026-12-04", "2026-11-25")).toBe("2026-12-04");
    expect(parseDay(["x"], "2026-11-25")).toBe("2026-11-25");
  });

  it("moves across a year boundary", () => {
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
  });

  it("finds the week of a day", () => {
    expect(weekOf("2026-12-02")).toEqual([
      "2026-11-29",
      "2026-11-30",
      "2026-12-01",
      "2026-12-02",
      "2026-12-03",
      "2026-12-04",
      "2026-12-05",
    ]);
  });
});
