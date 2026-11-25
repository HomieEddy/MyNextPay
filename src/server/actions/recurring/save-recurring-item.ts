"use server";

import type { ActionResult } from "@/lib/action-result";
import { fieldErrors } from "@/lib/field-errors";
import { recurringSchema } from "@/lib/schemas/recurring";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import {
  findRecurringItem,
  insertRecurringItems,
  updateRecurringItem,
} from "../../repos/recurring-repo";
import { toItemRow } from "./to-item-row";

/** Adds a new recurring item, or updates one when the input has an id. */
export async function saveRecurringItem(input: unknown): Promise<ActionResult> {
  await requireSession();
  const parsed = recurringSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const db = getDb();
  const { id, ...data } = parsed.data;
  const row = toItemRow({ id, ...data });
  if (id === undefined) {
    insertRecurringItems(db, [row]);
    return { ok: true };
  }
  if (!findRecurringItem(db, id))
    return { ok: false, error: "That item no longer exists." };
  updateRecurringItem(db, id, row);
  return { ok: true };
}
