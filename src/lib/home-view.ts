import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";
import { type CycleStatus, STATUS_LABEL } from "@/domain/status";
import { shortDate } from "./format-date";

export const MIN_OFFSET = -2;
export const MAX_OFFSET = 2;

/** The cycle offset from the `?c=` search param. Anything out of range means the current cycle. */
export function parseOffset(value: string | string[] | undefined): number {
  const text = Array.isArray(value) ? undefined : value;
  const offset = Number(text ?? 0);
  if (!Number.isInteger(offset) || offset < MIN_OFFSET || offset > MAX_OFFSET)
    return 0;
  return offset;
}

/** Link to another cycle, or null when that cycle is out of range. */
export function offsetHref(offset: number): string | null {
  if (offset < MIN_OFFSET || offset > MAX_OFFSET) return null;
  return offset === 0 ? "/" : `/?c=${offset}`;
}

export type HomeRow = {
  label: string;
  value: string;
  detail: string;
  tone: "orange" | "green" | "char";
};

export type HomeView = {
  periodLabel: string;
  paydayLabel: string;
  amount: string;
  status: CycleStatus;
  statusLabel: string;
  daysValue: string;
  daysLabel: string;
  dailyValue: string;
  rows: HomeRow[];
};

export function toHomeView(summary: CycleSummary): HomeView {
  const { cycle, mode } = summary;
  const unpaid = summary.billOccurrences.filter((bill) => !bill.paid).length;
  const daysLabel =
    mode === "ledger" && summary.isCurrent ? "days left" : "days in cycle";
  return {
    periodLabel: `${shortDate(cycle.start)} – ${shortDate(cycle.end)}`,
    paydayLabel: `Next payday ${shortDate(cycle.nextPayday)}`,
    amount: formatMoney(summary.safeToSpend),
    status: summary.status,
    statusLabel: STATUS_LABEL[summary.status],
    daysValue: String(summary.days),
    daysLabel,
    dailyValue: formatMoney(summary.dailyAllowance),
    rows: [
      {
        label: "Bills",
        value: formatMoney(summary.bills),
        detail: `${unpaid} still to pay`,
        tone: "orange",
      },
      {
        label: "Income",
        value: formatMoney(summary.income),
        detail: "this cycle",
        tone: "green",
      },
      {
        label: mode === "ledger" ? "Spent" : "Unexpected",
        value: formatMoney(summary.spent),
        detail: "logged so far",
        tone: "char",
      },
    ],
  };
}
