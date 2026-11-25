import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";
import { type CycleStatus, STATUS_LABEL } from "@/domain/status";
import { shortDate } from "./format-date";
import { offsetHref } from "./home-view";

export type CycleCardView = {
  offset: number;
  label: string;
  sub: string;
  status: CycleStatus;
  statusLabel: string;
  safe: string;
  negative: boolean;
  income: string;
  bills: string;
  perDay: string;
  href: string | null;
};

export function toCycleCard(
  summary: CycleSummary,
  offset: number,
): CycleCardView {
  const { cycle } = summary;
  return {
    offset,
    label: `${shortDate(cycle.start)} – ${shortDate(cycle.end)}`,
    sub: offset === 0 ? "Current cycle" : `Payday ${shortDate(cycle.start)}`,
    status: summary.status,
    statusLabel: STATUS_LABEL[summary.status],
    safe: formatMoney(summary.safeToSpend),
    negative: summary.safeToSpend < 0,
    income: formatMoney(summary.income),
    bills: formatMoney(summary.bills),
    perDay: formatMoney(summary.dailyAllowance),
    href: offsetHref(offset),
  };
}
