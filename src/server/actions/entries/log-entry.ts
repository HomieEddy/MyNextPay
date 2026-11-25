"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/action-result";
import { entrySchema } from "@/lib/schemas/entry";
import { getDb } from "../../db/client";
import { findEntry, insertEntries, updateEntry } from "../../repos/entry-repo";
import { authedAction } from "../safe-action";

/** Logs a one-off, or updates one when the input has an id. */
export const logEntry = authedAction
  .inputSchema(entrySchema)
  .action(async ({ parsedInput }): Promise<ActionResult> => {
    const { id, ...data } = parsedInput;
    const row = { ...data, description: data.description || data.category };
    const db = getDb();
    if (id !== undefined && !findEntry(db, id))
      return { ok: false, error: "That entry no longer exists." };
    if (id === undefined) insertEntries(db, [row]);
    else updateEntry(db, id, row);
    revalidatePath("/", "layout");
    return { ok: true };
  });
