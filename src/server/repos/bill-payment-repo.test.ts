import { describe, expect, it } from "vitest";
import { createDb } from "../db/client";
import {
  listBillPayments,
  markBillPaid,
  markBillsPaid,
  markBillUnpaid,
} from "./bill-payment-repo";
import { insertRecurringItems, listRecurringItems } from "./recurring-repo";

function dbWithRent() {
  const db = createDb(":memory:");
  insertRecurringItems(db, [
    {
      kind: "bill",
      name: "Rent",
      amount: 120000,
      scheduleKind: "monthly",
      dayOfMonth: 1,
      startDate: "2026-01-01",
    },
  ]);
  const [rent] = listRecurringItems(db);
  return { db, id: rent.id };
}

describe("bill payments", () => {
  it("marks an occurrence paid once, even when asked twice", () => {
    const { db, id } = dbWithRent();
    markBillPaid(db, id, "2026-12-01", "2026-11-30");
    markBillPaid(db, id, "2026-12-01", "2026-12-01");
    expect(listBillPayments(db)).toHaveLength(1);
  });

  it("unmarks only that occurrence", () => {
    const { db, id } = dbWithRent();
    markBillPaid(db, id, "2026-12-01", "2026-12-01");
    markBillPaid(db, id, "2027-01-01", "2026-12-01");
    markBillUnpaid(db, id, "2026-12-01");
    expect(listBillPayments(db).map((p) => p.dueDate)).toEqual(["2027-01-01"]);
  });
});

describe("markBillsPaid", () => {
  it("marks several occurrences and skips ones already paid", () => {
    const { db, id } = dbWithRent();
    markBillPaid(db, id, "2026-12-01", "2026-11-30");
    markBillsPaid(
      db,
      [
        { itemId: id, dueDate: "2026-12-01" },
        { itemId: id, dueDate: "2027-01-01" },
      ],
      "2026-12-01",
    );
    expect(listBillPayments(db)).toHaveLength(2);
  });
});
