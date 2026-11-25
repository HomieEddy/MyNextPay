"use server";

import type { ActionResult } from "@/lib/action-result";
import { recurringSchema } from "@/lib/schemas/recurring";
import { getDb } from "../../db/client";
import {
  findRecurringItem,
  insertRecurringItems,
  updateRecurringItem,
} from "../../repos/recurring-repo";
import { authedAction } from "../safe-action";
import { toItemRow } from "./to-item-row";

/** Adds a new recurring item, or updates one when the input has an id. */
export const saveRecurringItem = authedAction
  .inputSchema(recurringSchema)
  .action(async ({ parsedInput }): Promise<ActionResult> => {
    const db = getDb();
    const row = toItemRow(parsedInput);
    const { id } = parsedInput;
    if (id === undefined) {
      insertRecurringItems(db, [row]);
      return { ok: true };
    }
    if (!findRecurringItem(db, id))
      return { ok: false, error: "That item no longer exists." };
    updateRecurringItem(db, id, row);
    return { ok: true };
  });
