import { describe, expect, it } from "vitest";
import {
  type CycleInput,
  computeCycle,
  paidKey,
  type ScheduledItem,
} from "./cycle-summary";

const monthly = (
  id: number,
  name: string,
  amount: number,
  dayOfMonth: number,
  autoPay = false,
): ScheduledItem => ({
  id,
  name,
  category: "Bills",
  amount,
  autoPay,
  schedule: { kind: "monthly", dayOfMonth, startDate: "2026-01-01" },
});

const rent = monthly(1, "Rent", 125000, 1);
const internet = monthly(2, "Internet", 7000, 22);
const insurance = monthly(3, "Car insurance", 14200, 28);
const phone = monthly(4, "Phone", 6500, 24, true);

const base: CycleInput = {
  today: "2026-11-25",
  offset: 0,
  anchor: "2026-11-06",
  frequency: "biweekly",
  payAmount: 215000,
  mode: "simple",
  openingBalance: 0,
  openingBalanceDate: null,
  floor: 30000,
  bills: [rent, internet, insurance],
  incomes: [],
  entries: [],
  paidKeys: new Set(),
};

describe("computeCycle, simple mode", () => {
  it("subtracts bills and unexpected spending from the paycheck", () => {
    const summary = computeCycle({
      ...base,
      entries: [{ kind: "unexpected", amount: 48000, date: "2026-11-23" }],
    });
    expect(summary.cycle).toMatchObject({
      start: "2026-11-20",
      end: "2026-12-03",
      nextPayday: "2026-12-04",
    });
    expect(summary.bills).toBe(146200);
    expect(summary.safeToSpend).toBe(20800);
    expect(summary.status).toBe("tight");
    expect(summary.days).toBe(14);
    expect(summary.dailyAllowance).toBe(1485);
  });

  it("counts a bill as owed whether or not it is paid", () => {
    const paid = computeCycle({
      ...base,
      paidKeys: new Set([paidKey(1, "2026-12-01")]),
    });
    expect(paid.safeToSpend).toBe(computeCycle(base).safeToSpend);
  });

  it("marks auto-pay bills paid once their date has passed", () => {
    const summary = computeCycle({ ...base, bills: [...base.bills, phone] });
    const phoneRow = summary.billOccurrences.find((o) => o.name === "Phone");
    expect(phoneRow).toMatchObject({ date: "2026-11-24", paid: true });
    expect(summary.bills).toBe(152700);
  });

  it("looks back at the previous cycle", () => {
    const summary = computeCycle({ ...base, offset: -1 });
    expect(summary.isCurrent).toBe(false);
    expect(summary.cycle.start).toBe("2026-11-06");
    expect(summary.income).toBe(215000);
    expect(summary.safeToSpend).toBe(215000);
    expect(summary.dailyAllowance).toBe(15357);
    expect(summary.status).toBe("healthy");
  });
});

describe("computeCycle, ledger mode", () => {
  const ledger: CycleInput = {
    ...base,
    mode: "ledger",
    openingBalance: 240000,
    openingBalanceDate: "2026-11-21",
    bills: [rent, internet],
    entries: [{ kind: "expense", amount: 8640, date: "2026-11-21" }],
  };

  it("is balance plus income still to come, minus bills still due", () => {
    expect(computeCycle(ledger).safeToSpend).toBe(99360);
  });

  it("does not change when a bill is paid", () => {
    const paidInternet = computeCycle({
      ...ledger,
      paidKeys: new Set([paidKey(2, "2026-11-22")]),
    });
    expect(paidInternet.safeToSpend).toBe(99360);
  });

  it("counts the next paycheck as expected income until its date arrives", () => {
    const beforePayday = computeCycle({
      ...ledger,
      today: "2026-11-19",
      openingBalanceDate: "2026-11-19",
      offset: 1,
      bills: [],
      entries: [],
    });
    expect(beforePayday.cycle.start).toBe("2026-11-20");
    expect(beforePayday.safeToSpend).toBe(240000 + 215000);
  });
});
