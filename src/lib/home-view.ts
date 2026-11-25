import type { CycleSummary } from "@/domain/cycle-summary";
import { daysLeft } from "@/domain/cycles";
import type { IsoDate } from "@/domain/dates";
import { formatMoney } from "@/domain/money";
import { type CycleStatus, STATUS_LABEL } from "@/domain/status";
import { shortDate } from "./format-date";
import { type HomeCard, homeCards } from "./home-cards";

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

export type HomeView = {
  periodLabel: string;
  periodSub: string;
  caption: string;
  safeToSpend: number;
  status: CycleStatus;
  statusLabel: string;
  daysValue: string;
  daysLabel: string;
  ringFraction: number;
  dailyValue: string;
  dailyLabel: string;
  banner: { title: string; detail: string } | null;
  cards: HomeCard[];
};

type Context = { today: IsoDate; offset: number; warn: boolean };

function days(summary: CycleSummary, { today, offset }: Context) {
  const length = summary.cycle.lengthDays;
  if (offset === 0) {
    const left = daysLeft(summary.cycle, today);
    return {
      value: String(left),
      label: left === 1 ? "day left" : "days left",
      ring: left / length,
    };
  }
  return {
    value: String(length),
    label: "days long",
    ring: offset < 0 ? 0 : 1,
  };
}

function banner(
  summary: CycleSummary,
  context: Context,
  left: string,
): HomeView["banner"] {
  if (
    !context.warn ||
    context.offset !== 0 ||
    summary.safeToSpend >= summary.floor
  )
    return null;
  return {
    title: `${formatMoney(summary.floor - summary.safeToSpend)} below your ${formatMoney(summary.floor)} floor`,
    detail: `${left} days until payday. Go easy until ${shortDate(summary.cycle.nextPayday)}.`,
  };
}

function periodSub(summary: CycleSummary, offset: number): string {
  if (offset === 0) return `Payday ${shortDate(summary.cycle.nextPayday)}`;
  return offset < 0 ? "Past cycle" : "Coming up";
}

export function toHomeView(summary: CycleSummary, context: Context): HomeView {
  const simple = summary.mode === "simple";
  const left = days(summary, context);
  return {
    periodLabel: `${shortDate(summary.cycle.start)} – ${shortDate(summary.cycle.end)}`,
    periodSub: periodSub(summary, context.offset),
    caption: simple ? "Safe to spend this cycle" : "Safe to spend",
    safeToSpend: summary.safeToSpend,
    status: summary.status,
    statusLabel: STATUS_LABEL[summary.status],
    daysValue: left.value,
    daysLabel: left.label,
    ringFraction: left.ring,
    dailyValue: formatMoney(summary.dailyAllowance),
    dailyLabel: simple ? "daily budget" : "a day",
    banner: banner(summary, context, left.value),
    cards: homeCards(summary),
  };
}
