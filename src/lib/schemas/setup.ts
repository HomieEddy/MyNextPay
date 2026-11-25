import { z } from "zod";
import { positiveAmount } from "@/lib/zod-amount";
import { profileSchema } from "./profile";

export const billSchema = z.object({
  name: z.string().trim().min(1, "Give each bill a name."),
  amount: positiveAmount,
  dayOfMonth: z.number().int().min(1).max(31),
});

export const setupSchema = profileSchema.extend({
  bills: z.array(billSchema).max(40),
});

export type SetupInput = z.input<typeof setupSchema>;
export type SetupOutput = z.infer<typeof setupSchema>;
