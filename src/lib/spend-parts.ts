import type { DonutPart } from "@/components/ui/donut";
import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";

/** Where this cycle's income goes: bills, logged spending, and what's left. */
export function spendParts(summary: CycleSummary): DonutPart[] {
  const left = summary.safeToSpend;
  const parts: DonutPart[] = [
    {
      label: "Bills",
      value: summary.bills,
      display: formatMoney(summary.bills),
      color: "var(--color-orange)",
    },
    {
      label: summary.mode === "simple" ? "Unexpected" : "Spent",
      value: summary.spent,
      display: formatMoney(summary.spent),
      color: "var(--color-char)",
    },
    {
      label: left < 0 ? "Deficit" : "Free cash",
      value: Math.max(0, left),
      display: formatMoney(left),
      color: left < 0 ? "var(--color-red-ink)" : "var(--color-green)",
    },
  ];
  return parts.filter((part) => part.value > 0 || part.label !== "Spent");
}
