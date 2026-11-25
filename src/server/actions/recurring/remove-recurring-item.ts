"use server";

import { z } from "zod";
import { getDb } from "../../db/client";
import { deleteRecurringItem } from "../../repos/recurring-repo";
import { authedAction } from "../safe-action";

export const removeRecurringItem = authedAction
  .inputSchema(z.number().int().positive())
  .action(async ({ parsedInput: id }) => {
    deleteRecurringItem(getDb(), id);
  });
