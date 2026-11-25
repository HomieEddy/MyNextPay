import { z } from "zod";
import { positiveAmount } from "@/lib/zod-amount";
import { isoDate } from "./profile";

export const recurringSchema = z.object({
  id: z.number().int().positive().optional(),
  kind: z.enum(["bill", "income"]),
  name: z.string().trim().min(1, "Give it a name."),
  category: z.string().trim().max(40),
  amount: positiveAmount,
  scheduleKind: z.enum(["weekly", "monthly", "interval"]),
  weekday: z.number().int().min(0).max(6),
  everyWeeks: z.number().int().min(1).max(4),
  dayOfMonth: z.number().int().min(1).max(31),
  everyDays: z.number().int().min(1).max(366),
  startDate: isoDate,
  autoPay: z.boolean(),
});

export type RecurringInput = z.input<typeof recurringSchema>;
export type RecurringOutput = z.infer<typeof recurringSchema>;
