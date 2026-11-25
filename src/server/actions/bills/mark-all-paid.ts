"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isoDate } from "@/lib/schemas/profile";
import { getDb } from "../../db/client";
import { markBillsPaid } from "../../repos/bill-payment-repo";
import { appToday } from "../../today";
import { authedAction } from "../safe-action";

const occurrencesSchema = z
  .array(z.object({ itemId: z.number().int().positive(), dueDate: isoDate }))
  .max(200);

/** Marks every listed bill occurrence paid at once. */
export const markAllPaid = authedAction
  .inputSchema(occurrencesSchema)
  .action(async ({ parsedInput }) => {
    markBillsPaid(getDb(), parsedInput, appToday());
    revalidatePath("/", "layout");
  });
