import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const createdAt = () =>
  text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`);

/** The one person who uses this NextPay install. Always id 1. */
export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().default(""),
  passwordHash: text("password_hash").notNull(),
  createdAt: createdAt(),
});

/** Only the SHA-256 hash of a session token is stored. */
export const session = sqliteTable("session", {
  tokenHash: text("token_hash").primaryKey(),
  expiresAt: integer("expires_at").notNull(),
  createdAt: createdAt(),
});

/** Pay profile and preferences. Always id 1. Amounts are in cents. */
export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey(),
  anchorPayday: text("anchor_payday").notNull(),
  payFrequency: text("pay_frequency", {
    enum: ["weekly", "biweekly", "monthly"],
  }).notNull(),
  payAmount: integer("pay_amount").notNull(),
  mode: text("mode", { enum: ["simple", "ledger"] })
    .notNull()
    .default("simple"),
  openingBalance: integer("opening_balance").notNull().default(0),
  openingBalanceDate: text("opening_balance_date"),
  floor: integer("floor").notNull().default(30000),
  lowBalanceWarning: integer("low_balance_warning", { mode: "boolean" })
    .notNull()
    .default(true),
});

/** A bill or a secondary income stream on a schedule. */
export const recurringItem = sqliteTable("recurring_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind", { enum: ["bill", "income"] }).notNull(),
  name: text("name").notNull(),
  category: text("category").notNull().default("Other"),
  amount: integer("amount").notNull(),
  scheduleKind: text("schedule_kind", {
    enum: ["weekly", "monthly", "interval"],
  }).notNull(),
  weekday: integer("weekday"),
  everyWeeks: integer("every_weeks"),
  dayOfMonth: integer("day_of_month"),
  everyDays: integer("every_days"),
  startDate: text("start_date").notNull(),
  autoPay: integer("auto_pay", { mode: "boolean" }).notNull().default(false),
  createdAt: createdAt(),
});

/** Marks one occurrence of a bill as paid. */
export const billPayment = sqliteTable(
  "bill_payment",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    itemId: integer("item_id")
      .notNull()
      .references(() => recurringItem.id, { onDelete: "cascade" }),
    dueDate: text("due_date").notNull(),
    paidOn: text("paid_on").notNull(),
  },
  (table) => [
    uniqueIndex("bill_payment_item_due").on(table.itemId, table.dueDate),
  ],
);

/** A one-off entry. "unexpected" is the only kind Simple mode uses. */
export const entry = sqliteTable("entry", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind", { enum: ["expense", "income", "unexpected"] }).notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("Other"),
  amount: integer("amount").notNull(),
  date: text("date").notNull(),
  createdAt: createdAt(),
});
