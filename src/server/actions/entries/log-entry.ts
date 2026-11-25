"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { entrySchema } from "@/lib/schemas/entry";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { insertEntries } from "../../repos/entry-repo";

/** Logs a one-off: an unexpected expense in Simple mode, any transaction in Ledger mode. */
export async function logEntry(input: unknown): Promise<ActionResult> {
  await requireSession();
  const parsed = entrySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }
  const data = parsed.data;
  insertEntries(getDb(), [
    { ...data, description: data.description || data.category },
  ]);
  revalidatePath("/", "layout");
  return { ok: true };
}
