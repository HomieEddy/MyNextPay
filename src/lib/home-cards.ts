import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";

export type HomeCard = {
  title: string;
  value: string;
  detail: string;
  tone: "bills" | "income" | "spend" | "forecast";
  href: string;
};

type CardText = Omit<HomeCard, "tone" | "href">;

function spendText(summary: CycleSummary): CardText {
  if (summary.mode === "ledger") {
    return {
      title: "Spending",
      value: formatMoney(summary.spent),
      detail: "Logged this cycle",
    };
  }
  const committed = Math.round(
    (summary.bills / Math.max(1, summary.income)) * 100,
  );
  const detail =
    summary.spent > 0
      ? `${formatMoney(summary.spent)} unexpected`
      : "Bills vs. free cash";
  return { title: "Breakdown", value: `${committed}% committed`, detail };
}

/** The Wallet-style cards under the hero. Each opens a sheet. */
export function homeCards(
  summary: CycleSummary,
  hrefFor: (sheet: string) => string,
): HomeCard[] {
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
      href: hrefFor("bills"),
    },
    {
      title: "Income",
      value: formatMoney(summary.income),
      detail: incomeDetail,
      tone: "income",
      href: hrefFor("income"),
    },
    { ...spendText(summary), tone: "spend", href: hrefFor("spend") },
  ];
}
