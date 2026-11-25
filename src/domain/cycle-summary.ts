import {
  type Cycle,
  cycleFor,
  daysLeft,
  type PayFrequency,
  paySchedule,
} from "./cycles";
import { type IsoDate, isBetween } from "./dates";
import { type Cents, sumCents } from "./money";
import {
  dailyAllowance,
  ledgerBalance,
  ledgerSafeToSpend,
  simpleSafeToSpend,
} from "./safe-to-spend";
import { occurrencesBetween, type Schedule } from "./schedules";
import { type CycleStatus, cycleStatus } from "./status";

export type TrackingMode = "simple" | "ledger";

export type ScheduledItem = {
  id: number;
  name: string;
  category: string;
  amount: Cents;
  schedule: Schedule;
  autoPay: boolean;
};

export type LedgerEntry = {
  kind: "expense" | "income" | "unexpected";
  amount: Cents;
  date: IsoDate;
};

export type Occurrence = {
  itemId: number;
  name: string;
  category: string;
  amount: Cents;
  date: IsoDate;
  paid: boolean;
};

export type CycleInput = {
  today: IsoDate;
  /** 0 = the cycle containing today, -1 = the one before, 1 = the one after. */
  offset: number;
  anchor: IsoDate;
  frequency: PayFrequency;
  payAmount: Cents;
  mode: TrackingMode;
  openingBalance: Cents;
  openingBalanceDate: IsoDate | null;
  floor: Cents;
  bills: ScheduledItem[];
  incomes: ScheduledItem[];
  entries: LedgerEntry[];
  /** Keys from `paidKey()` for bill occurrences that were marked paid. */
  paidKeys: ReadonlySet<string>;
};

export type CycleSummary = {
  cycle: Cycle;
  isCurrent: boolean;
  mode: TrackingMode;
  safeToSpend: Cents;
  status: CycleStatus;
  floor: Cents;
  income: Cents;
  bills: Cents;
  spent: Cents;
  billOccurrences: Occurrence[];
  days: number;
  dailyAllowance: Cents;
};

export function paidKey(itemId: number, date: IsoDate): string {
  return `${itemId}:${date}`;
}

function occurrencesOf(
  items: ScheduledItem[],
  from: IsoDate,
  to: IsoDate,
  today: IsoDate,
  paidKeys: ReadonlySet<string>,
): Occurrence[] {
  return items.flatMap((item) =>
    occurrencesBetween(item.schedule, from, to).map((date) => ({
      itemId: item.id,
      name: item.name,
      category: item.category,
      amount: item.amount,
      date,
      paid:
        paidKeys.has(paidKey(item.id, date)) || (item.autoPay && date < today),
    })),
  );
}

function totalOf(rows: Occurrence[]): Cents {
  return sumCents(rows.map((row) => row.amount));
}

/** Money in the account today: opening balance, plus everything that happened since it was set. */
function balanceToday(input: CycleInput, incomes: ScheduledItem[]): Cents {
  const from = input.openingBalanceDate;
  if (!from) return input.openingBalance;
  const { today, paidKeys } = input;
  const received = occurrencesOf(incomes, from, today, today, paidKeys).map(
    (o) => o.amount,
  );
  const paidBills = occurrencesOf(input.bills, from, today, today, paidKeys)
    .filter((o) => o.paid)
    .map((o) => -o.amount);
  const logged = input.entries
    .filter((e) => e.date >= from && e.date <= today)
    .map((e) => (e.kind === "income" ? e.amount : -e.amount));
  return ledgerBalance(input.openingBalance, [
    ...received,
    ...paidBills,
    ...logged,
  ]);
}

function ledgerSafe(
  input: CycleInput,
  cycle: Cycle,
  bills: Occurrence[],
  incomes: ScheduledItem[],
): Cents {
  const expected = occurrencesOf(
    incomes,
    cycle.start,
    cycle.end,
    input.today,
    input.paidKeys,
  )
    .filter((o) => o.date > input.today)
    .map((o) => o.amount);
  return ledgerSafeToSpend({
    balance: balanceToday(input, incomes),
    incomeStillExpected: expected,
    billsStillDue: bills.filter((b) => !b.paid).map((b) => b.amount),
  });
}

export function computeCycle(input: CycleInput): CycleSummary {
  const { today, paidKeys, mode } = input;
  const cycle = cycleFor(input.anchor, input.frequency, today, input.offset);
  const paycheck: ScheduledItem = {
    id: 0,
    name: "Paycheck",
    category: "Income",
    amount: input.payAmount,
    schedule: paySchedule(input.anchor, input.frequency),
    autoPay: true,
  };
  const incomeItems = [paycheck, ...input.incomes];
  const bills = occurrencesOf(
    input.bills,
    cycle.start,
    cycle.end,
    today,
    paidKeys,
  );
  const incomes = occurrencesOf(
    incomeItems,
    cycle.start,
    cycle.end,
    today,
    paidKeys,
  );
  const spendKinds =
    mode === "ledger" ? ["expense", "unexpected"] : ["unexpected"];
  const spent = sumCents(
    input.entries
      .filter(
        (e) =>
          isBetween(e.date, cycle.start, cycle.end) &&
          spendKinds.includes(e.kind),
      )
      .map((e) => e.amount),
  );
  const income = totalOf(incomes);
  const billTotal = totalOf(bills);
  const safeToSpend =
    mode === "simple"
      ? simpleSafeToSpend({
          income: [income],
          bills: [billTotal],
          unexpected: [spent],
        })
      : ledgerSafe(input, cycle, bills, incomeItems);
  const isCurrent = input.offset === 0;
  const days =
    mode === "simple"
      ? cycle.lengthDays
      : isCurrent
        ? daysLeft(cycle, today)
        : cycle.lengthDays;
  return {
    cycle,
    isCurrent,
    mode,
    safeToSpend,
    status: cycleStatus(safeToSpend, input.floor),
    floor: input.floor,
    income,
    bills: billTotal,
    spent,
    billOccurrences: bills,
    days,
    dailyAllowance: dailyAllowance(safeToSpend, Math.max(1, days)),
  };
}
