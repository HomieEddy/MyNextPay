import type { z } from "zod";
import type { IsoDate } from "@/domain/dates";
import type { billSchema } from "@/lib/schemas/setup";
import type { RecurringItemInput } from "../../repos/recurring-repo";

type SetupBill = z.infer<typeof billSchema>;

/** A bill from the setup wizard: monthly, and logged automatically when due. */
export function billRow(
  bill: SetupBill,
  startDate: IsoDate,
): RecurringItemInput {
  return {
    kind: "bill",
    name: bill.name,
    category: "Other",
    amount: bill.amount,
    scheduleKind: "monthly",
    dayOfMonth: bill.dayOfMonth,
    weekday: null,
    everyWeeks: null,
    everyDays: null,
    startDate,
    autoPay: true,
  };
}
