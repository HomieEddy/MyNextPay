"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/action-result";
import { billPaymentSchema } from "@/lib/schemas/bill-payment";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { markBillPaid, markBillUnpaid } from "../../repos/bill-payment-repo";
import { appToday } from "../../today";

/** Marks one bill occurrence paid or unpaid. Safe-to-spend doesn't change: the money was reserved. */
export async function setBillPaid(input: unknown): Promise<ActionResult> {
  await requireSession();
  const parsed = billPaymentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Unknown bill." };

  const { itemId, dueDate, paid } = parsed.data;
  if (paid) markBillPaid(getDb(), itemId, dueDate, appToday());
  else markBillUnpaid(getDb(), itemId, dueDate);
  revalidatePath("/", "layout");
  return { ok: true };
}
