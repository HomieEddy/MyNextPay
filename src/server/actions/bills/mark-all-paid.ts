"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult } from "@/lib/action-result";
import { isoDate } from "@/lib/schemas/profile";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { markBillsPaid } from "../../repos/bill-payment-repo";
import { appToday } from "../../today";

const occurrencesSchema = z
  .array(z.object({ itemId: z.number().int().positive(), dueDate: isoDate }))
  .max(200);

/** Marks every listed bill occurrence paid at once. */
export async function markAllPaid(input: unknown): Promise<ActionResult> {
  await requireSession();
  const parsed = occurrencesSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Unknown bills." };
  markBillsPaid(getDb(), parsed.data, appToday());
  revalidatePath("/", "layout");
  return { ok: true };
}
