import { type Cents, sumCents } from "./money";

/** Simple mode: each payday starts fresh. Only big one-offs are logged. */
export function simpleSafeToSpend(input: {
  income: Cents[];
  bills: Cents[];
  unexpected: Cents[];
}): Cents {
  return (
    sumCents(input.income) - sumCents(input.bills) - sumCents(input.unexpected)
  );
}

/** Ledger mode: the real balance, plus income still coming, minus bills not yet paid. */
export function ledgerSafeToSpend(input: {
  balance: Cents;
  incomeStillExpected: Cents[];
  billsStillDue: Cents[];
}): Cents {
  return (
    input.balance +
    sumCents(input.incomeStillExpected) -
    sumCents(input.billsStillDue)
  );
}

/** Ledger balance: the opening balance plus every signed entry since (income +, spending -). */
export function ledgerBalance(openingBalance: Cents, entries: Cents[]): Cents {
  return openingBalance + sumCents(entries);
}

/** Per-day spending guide. Never negative; whole cents, rounded down. */
export function dailyAllowance(safeToSpend: Cents, days: number): Cents {
  if (days <= 0 || safeToSpend <= 0) return 0;
  return Math.floor(safeToSpend / days);
}
