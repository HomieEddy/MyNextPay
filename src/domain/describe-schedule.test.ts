import { describe, expect, it } from "vitest";
import { describeSchedule, ordinal } from "./describe-schedule";

describe("ordinal", () => {
  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [21, "21st"],
    [22, "22nd"],
    [31, "31st"],
  ])("%i is %s", (n, expected) => {
    expect(ordinal(n)).toBe(expected);
  });
});

describe("describeSchedule", () => {
  it("describes each kind", () => {
    expect(
      describeSchedule({
        kind: "monthly",
        dayOfMonth: 28,
        startDate: "2026-01-01",
      }),
    ).toBe("Monthly on the 28th");
    expect(
      describeSchedule({
        kind: "weekly",
        weekday: 1,
        everyWeeks: 4,
        startDate: "2026-01-01",
      }),
    ).toBe("Every 4 weeks on Monday");
    expect(
      describeSchedule({
        kind: "weekly",
        weekday: 5,
        everyWeeks: 1,
        startDate: "2026-01-01",
      }),
    ).toBe("Every Friday");
    expect(
      describeSchedule({
        kind: "interval",
        everyDays: 60,
        startDate: "2026-01-01",
      }),
    ).toBe("Every 60 days");
  });
});
