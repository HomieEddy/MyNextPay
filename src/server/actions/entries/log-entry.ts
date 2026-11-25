"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { entrySchema } from "@/lib/schemas/entry";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { findEntry, insertEntries, updateEntry } from "../../repos/entry-repo";

/** Logs a one-off, or updates one when the input has an id. */
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
  const { id, ...data } = parsed.data;
  const row = { ...data, description: data.description || data.category };
  const db = getDb();
  if (id !== undefined && !findEntry(db, id))
    return { ok: false, error: "That entry no longer exists." };
  if (id === undefined) insertEntries(db, [row]);
  else updateEntry(db, id, row);
  revalidatePath("/", "layout");
  return { ok: true };
}
