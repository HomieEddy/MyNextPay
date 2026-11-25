import type { Occurrence } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";
import { shortDate } from "@/lib/format-date";

export type SheetRow = {
  key: string;
  itemId: number;
  date: string;
  name: string;
  detail: string;
  amount: string;
  paid: boolean;
};

export function toSheetRows(
  occurrences: Occurrence[],
  verb: string,
): SheetRow[] {
  return occurrences
    .toSorted((a, b) => a.date.localeCompare(b.date))
    .map((o) => ({
      key: `${o.itemId}:${o.date}`,
      itemId: o.itemId,
      date: o.date,
      name: o.name,
      detail: `${o.category} · ${verb} ${shortDate(o.date)}`,
      amount: formatMoney(o.amount),
      paid: o.paid,
    }));
}
