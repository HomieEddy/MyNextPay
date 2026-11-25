import { formatMoney } from "@/domain/money";
import type { Entry } from "@/server/repos/entry-repo";
import { shortDate } from "./format-date";

export type EntryRow = {
  id: number;
  name: string;
  detail: string;
  amount: string;
  income: boolean;
};

export function toEntryRows(entries: Entry[]): EntryRow[] {
  return entries.map((e) => {
    const income = e.kind === "income";
    return {
      id: e.id,
      name: e.description,
      detail: `${e.category} · ${shortDate(e.date)}`,
      amount: `${income ? "+" : ""}${formatMoney(e.amount)}`,
      income,
    };
  });
}
