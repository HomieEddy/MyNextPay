"use server";

import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { deleteRecurringItem } from "../../repos/recurring-repo";

export async function removeRecurringItem(id: number): Promise<void> {
  await requireSession();
  if (!Number.isInteger(id) || id <= 0) return;
  deleteRecurringItem(getDb(), id);
}
