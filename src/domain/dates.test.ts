import { describe, expect, it } from "vitest";
import { addDays, daysBetween, isBetween, today } from "./dates";

describe("dates", () => {
  it("adds days across month and year ends", () => {
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
    expect(addDays("2028-02-28", 1)).toBe("2028-02-29");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });

  it("counts calendar days", () => {
    expect(daysBetween("2026-11-25", "2026-12-04")).toBe(9);
    expect(daysBetween("2026-12-04", "2026-11-25")).toBe(-9);
  });

  it("checks inclusive ranges", () => {
    expect(isBetween("2026-11-20", "2026-11-20", "2026-12-03")).toBe(true);
    expect(isBetween("2026-12-04", "2026-11-20", "2026-12-03")).toBe(false);
  });

  it("returns today's date in a time zone", () => {
    const lateEvening = new Date("2026-11-26T03:00:00Z");
    expect(today("America/Toronto", lateEvening)).toBe("2026-11-25");
    expect(today("UTC", lateEvening)).toBe("2026-11-26");
  });
});
