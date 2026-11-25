import { type Cents, formatMoney } from "@/domain/money";

/** "$1,234.56" split into "$1,234" and ".56", so the cents can be drawn smaller. */
export function splitMoney(cents: Cents): { whole: string; fraction: string } {
  const text = formatMoney(cents);
  const dot = text.lastIndexOf(".");
  return { whole: text.slice(0, dot), fraction: text.slice(dot) };
}
