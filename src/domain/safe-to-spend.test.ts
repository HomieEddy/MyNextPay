import { describe, expect, it } from "vitest";
import {
  dailyAllowance,
  ledgerBalance,
  ledgerSafeToSpend,
  simpleSafeToSpend,
} from "./safe-to-spend";

describe("simpleSafeToSpend", () => {
  it("is income minus bills minus unexpected expenses", () => {
    const safe = simpleSafeToSpend({
      income: [215000],
      bills: [125000, 7000],
      unexpected: [48000],
    });
    expect(safe).toBe(35000);
  });

  it("can go negative", () => {
    expect(
      simpleSafeToSpend({ income: [100000], bills: [120000], unexpected: [] }),
    ).toBe(-20000);
  });
});

describe("ledgerSafeToSpend", () => {
  it("is balance plus income still coming minus bills still due", () => {
    const safe = ledgerSafeToSpend({
      balance: 240000,
      incomeStillExpected: [],
      billsStillDue: [125000, 14200],
    });
    expect(safe).toBe(100800);
  });

  it("does not change when a bill is paid", () => {
    const before = ledgerSafeToSpend({
      balance: 200000,
      incomeStillExpected: [],
      billsStillDue: [50000],
    });
    const after = ledgerSafeToSpend({
      balance: 150000,
      incomeStillExpected: [],
      billsStillDue: [],
    });
    expect(after).toBe(before);
  });
});

describe("ledgerBalance", () => {
  it("adds signed entries to the opening balance", () => {
    expect(ledgerBalance(32000, [215000, -8640, -625])).toBe(237735);
  });
});

describe("dailyAllowance", () => {
  it("divides what's left by the days remaining, rounding down", () => {
    expect(dailyAllowance(85825, 9)).toBe(9536);
  });

  it("is zero when nothing is left or no days remain", () => {
    expect(dailyAllowance(-500, 9)).toBe(0);
    expect(dailyAllowance(85825, 0)).toBe(0);
  });
});
