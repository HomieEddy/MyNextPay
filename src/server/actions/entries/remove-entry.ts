"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "../../auth/require-session";
import { getDb } from "../../db/client";
import { deleteEntry } from "../../repos/entry-repo";

export async function removeEntry(id: number): Promise<void> {
  await requireSession();
  if (!Number.isInteger(id) || id <= 0) return;
  deleteEntry(getDb(), id);
  revalidatePath("/", "layout");
}
