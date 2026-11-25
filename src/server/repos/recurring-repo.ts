import { eq } from "drizzle-orm";
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

export function findRecurringItem(
  db: Db,
  id: number,
): RecurringItem | undefined {
  return db.select().from(recurringItem).where(eq(recurringItem.id, id)).get();
}

export function insertRecurringItems(db: Db, items: RecurringItemInput[]) {
  if (items.length === 0) return;
  db.insert(recurringItem).values(items).run();
}

export function updateRecurringItem(
  db: Db,
  id: number,
  input: RecurringItemInput,
) {
  db.update(recurringItem).set(input).where(eq(recurringItem.id, id)).run();
}

export function deleteRecurringItem(db: Db, id: number) {
  db.delete(recurringItem).where(eq(recurringItem.id, id)).run();
}
