"use server";

import { revalidatePath } from "next/cache";
import { billPaymentSchema } from "@/lib/schemas/bill-payment";
import { getDb } from "../../db/client";
import { markBillPaid, markBillUnpaid } from "../../repos/bill-payment-repo";
import { appToday } from "../../today";
import { authedAction } from "../safe-action";

/** Marks one bill occurrence paid or unpaid. Safe-to-spend doesn't change: the money was reserved. */
export const setBillPaid = authedAction
  .inputSchema(billPaymentSchema)
  .action(async ({ parsedInput: { itemId, dueDate, paid } }) => {
    if (paid) markBillPaid(getDb(), itemId, dueDate, appToday());
    else markBillUnpaid(getDb(), itemId, dueDate);
    revalidatePath("/", "layout");
  });
