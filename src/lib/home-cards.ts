import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";

export type HomeCard = {
  title: string;
  value: string;
  detail: string;
  tone: "bills" | "income" | "spend";
};

function thirdCard(summary: CycleSummary): HomeCard {
  if (summary.mode === "ledger") {
    return {
      title: "Spending",
      value: formatMoney(summary.spent),
      detail: "Logged this cycle",
      tone: "spend",
    };
  }
  const committed = Math.round(
    (summary.bills / Math.max(1, summary.income)) * 100,
  );
  const detail =
    summary.spent > 0
      ? `${formatMoney(summary.spent)} unexpected`
      : "Bills vs. free cash";
  return {
    title: "Breakdown",
    value: `${committed}% committed`,
    detail,
    tone: "spend",
  };
}

/** The Wallet-style cards under the hero. */
export function homeCards(summary: CycleSummary): HomeCard[] {
  const bills = summary.billOccurrences;
  const paid = bills.filter((bill) => bill.paid).length;
  const incomeDetail =
    summary.mode === "simple"
      ? "Paycheck only, fresh each payday"
      : "Paycheck plus other income";
  return [
    {
      title: "Bills",
      value: formatMoney(summary.bills),
      detail: `${paid} of ${bills.length} paid`,
      tone: "bills",
    },
    {
      title: "Income",
      value: formatMoney(summary.income),
      detail: incomeDetail,
      tone: "income",
    },
    thirdCard(summary),
  ];
}
