import { and, eq } from "drizzle-orm";
import type { IsoDate } from "@/domain/dates";
import type { Db } from "../db/client";
import { billPayment } from "../db/schema";

export function listBillPayments(db: Db) {
  return db.select().from(billPayment).all();
}

/** Marks one occurrence of a bill paid. Marking it twice changes nothing. */
export function markBillPaid(
  db: Db,
  itemId: number,
  dueDate: IsoDate,
  paidOn: IsoDate,
) {
  db.insert(billPayment)
    .values({ itemId, dueDate, paidOn })
    .onConflictDoNothing()
    .run();
}

export function markBillUnpaid(db: Db, itemId: number, dueDate: IsoDate) {
  db.delete(billPayment)
    .where(
      and(eq(billPayment.itemId, itemId), eq(billPayment.dueDate, dueDate)),
    )
    .run();
}

/** Marks several occurrences paid in one transaction. */
export function markBillsPaid(
  db: Db,
  occurrences: { itemId: number; dueDate: IsoDate }[],
  paidOn: IsoDate,
) {
  db.transaction((tx) => {
    for (const { itemId, dueDate } of occurrences) {
      tx.insert(billPayment)
        .values({ itemId, dueDate, paidOn })
        .onConflictDoNothing()
        .run();
    }
  });
}
