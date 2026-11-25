import { z } from "zod";
import { nonnegativeAmount, positiveAmount } from "@/lib/zod-amount";

export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date.");

export const profileSchema = z.object({
  name: z.string().trim().max(60, "Keep it under 60 characters."),
  anchorPayday: isoDate,
  payFrequency: z.enum(["weekly", "biweekly", "monthly"]),
  payAmount: positiveAmount,
  mode: z.enum(["simple", "ledger"]),
  openingBalance: nonnegativeAmount,
  floor: nonnegativeAmount,
  lowBalanceWarning: z.boolean(),
});

export type ProfileInput = z.input<typeof profileSchema>;
export type ProfileOutput = z.infer<typeof profileSchema>;
