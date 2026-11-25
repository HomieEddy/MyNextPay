import type { Db } from "../db/client";
import { billPayment } from "../db/schema";

export function listBillPayments(db: Db) {
  return db.select().from(billPayment).all();
}
