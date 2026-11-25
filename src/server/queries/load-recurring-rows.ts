import "server-only";
import type { IsoDate } from "@/domain/dates";
import type { Db } from "../db/client";
import {
  listRecurringItems,
  type RecurringItem,
} from "../repos/recurring-repo";
import { type RecurringRow, toRecurringRow } from "./recurring-rows";

function rowsOf(
  items: RecurringItem[],
  kind: RecurringItem["kind"],
  today: IsoDate,
): RecurringRow[] {
  return items
    .filter((item) => item.kind === kind)
    .map((item) => toRecurringRow(item, today));
}

/** Every bill and income, ready for the Recurring list. */
export function loadRecurringRows(db: Db, today: IsoDate) {
  const items = listRecurringItems(db);
  return {
    bills: rowsOf(items, "bill", today),
    incomes: rowsOf(items, "income", today),
  };
}
