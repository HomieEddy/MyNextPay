import type { Db } from "../db/client";
import { recurringItem } from "../db/schema";

export type RecurringItem = typeof recurringItem.$inferSelect;
export type RecurringItemInput = Omit<
  typeof recurringItem.$inferInsert,
  "id" | "createdAt"
>;

export function listRecurringItems(db: Db): RecurringItem[] {
  return db.select().from(recurringItem).all();
}

export function insertRecurringItems(db: Db, items: RecurringItemInput[]) {
  if (items.length === 0) return;
  db.insert(recurringItem).values(items).run();
}
