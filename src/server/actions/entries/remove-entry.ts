"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getDb } from "../../db/client";
import { deleteEntry } from "../../repos/entry-repo";
import { authedAction } from "../safe-action";

export const removeEntry = authedAction
  .inputSchema(z.number().int().positive())
  .action(async ({ parsedInput: id }) => {
    deleteEntry(getDb(), id);
    revalidatePath("/", "layout");
  });
