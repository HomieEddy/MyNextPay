import { describe, expect, it } from "vitest";
import { formatMoney, parseAmount, sumCents } from "./money";

describe("parseAmount", () => {
  it.each([
    ["12", 1200],
    ["12.5", 1250],
    ["12.50", 1250],
    ["$1,234.56", 123456],
    [" 0.07 ", 7],
    ["0", 0],
  ])("parses %s", (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  it.each(["", "abc", "12.345", "-5", "1.2.3"])("rejects %s", (input) => {
    expect(parseAmount(input)).toBeNull();
  });

  it("avoids float rounding errors", () => {
    expect(parseAmount("0.29")).toBe(29);
    expect(parseAmount("1.005")).toBeNull();
  });
});

describe("formatMoney", () => {
  it("formats cents as Canadian dollars", () => {
    expect(formatMoney(123456)).toBe("$1,234.56");
    expect(formatMoney(-1250)).toBe("-$12.50");
  });
});

describe("sumCents", () => {
  it("adds amounts and handles an empty list", () => {
    expect(sumCents([100, 250])).toBe(350);
    expect(sumCents([])).toBe(0);
  });
});
