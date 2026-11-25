import { z } from "zod";
import { isoDate } from "./profile";

export const billPaymentSchema = z.object({
  itemId: z.number().int().positive(),
  dueDate: isoDate,
  paid: z.boolean(),
});
