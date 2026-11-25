import { z } from "zod";
import { positiveAmount } from "@/lib/zod-amount";
import { isoDate } from "./profile";

export const entrySchema = z.object({
  id: z.number().int().positive().optional(),
  kind: z.enum(["expense", "income", "unexpected"]),
  description: z.string().trim().max(60, "Keep it under 60 characters."),
  category: z.string().trim().min(1).max(40),
  amount: positiveAmount,
  date: isoDate,
});

export type EntryFormInput = z.input<typeof entrySchema>;
