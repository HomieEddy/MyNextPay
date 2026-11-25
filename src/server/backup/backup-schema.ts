import { z } from "zod";

const cents = z.number().int();
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const id = z.number().int().positive();

const settingsRow = z.object({
  id,
  anchorPayday: isoDate,
  payFrequency: z.enum(["weekly", "biweekly", "monthly"]),
  payAmount: cents,
  mode: z.enum(["simple", "ledger"]),
  openingBalance: cents,
  openingBalanceDate: isoDate.nullable(),
  floor: cents,
  lowBalanceWarning: z.boolean(),
});

const recurringRow = z.object({
  id,
  kind: z.enum(["bill", "income"]),
  name: z.string().max(80),
  category: z.string().max(40),
  amount: cents,
  scheduleKind: z.enum(["weekly", "monthly", "interval"]),
  weekday: z.number().int().nullable(),
  everyWeeks: z.number().int().nullable(),
  dayOfMonth: z.number().int().nullable(),
  everyDays: z.number().int().nullable(),
  startDate: isoDate,
  autoPay: z.boolean(),
  createdAt: z.string(),
});

const paymentRow = z.object({
  id,
  itemId: id,
  dueDate: isoDate,
  paidOn: isoDate,
});

const entryRow = z.object({
  id,
  kind: z.enum(["expense", "income", "unexpected"]),
  description: z.string().max(80),
  category: z.string().max(40),
  amount: cents,
  date: isoDate,
  createdAt: z.string(),
});

/** Version 1 of the backup file. Holds the money data, never the password or sessions. */
export const backupSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  data: z.object({
    settings: z.array(settingsRow).max(1),
    recurringItems: z.array(recurringRow).max(1000),
    billPayments: z.array(paymentRow).max(50000),
    entries: z.array(entryRow).max(50000),
  }),
});

export type Backup = z.infer<typeof backupSchema>;
