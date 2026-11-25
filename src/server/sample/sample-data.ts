import type { EntryInput } from "../repos/entry-repo";
import type { RecurringItemInput } from "../repos/recurring-repo";
import type { SettingsInput } from "../repos/settings-repo";

/** The same believable example data as the design mockup. Amounts are in cents. */
export const SAMPLE_SETTINGS: SettingsInput = {
  anchorPayday: "2026-11-06",
  payFrequency: "biweekly",
  payAmount: 215000,
  mode: "simple",
  openingBalance: 32000,
  openingBalanceDate: "2026-11-20",
  floor: 30000,
  lowBalanceWarning: true,
};

const monthly = (dayOfMonth: number) =>
  ({ scheduleKind: "monthly", dayOfMonth, startDate: "2026-01-01" }) as const;

export const SAMPLE_RECURRING: RecurringItemInput[] = [
  {
    kind: "bill",
    name: "Rent",
    category: "Housing",
    amount: 125000,
    ...monthly(1),
  },
  {
    kind: "bill",
    name: "Internet",
    category: "Utilities",
    amount: 7000,
    ...monthly(22),
  },
  {
    kind: "bill",
    name: "Phone",
    category: "Utilities",
    amount: 6500,
    autoPay: true,
    ...monthly(24),
  },
  {
    kind: "bill",
    name: "Car insurance",
    category: "Transport",
    amount: 14200,
    autoPay: true,
    ...monthly(28),
  },
  {
    kind: "bill",
    name: "Spotify",
    category: "Subscriptions",
    amount: 1200,
    autoPay: true,
    ...monthly(2),
  },
  {
    kind: "bill",
    name: "Gym",
    category: "Health",
    amount: 4500,
    autoPay: true,
    scheduleKind: "weekly",
    weekday: 1,
    everyWeeks: 4,
    startDate: "2026-11-09",
  },
  {
    kind: "bill",
    name: "Water",
    category: "Utilities",
    amount: 3800,
    scheduleKind: "interval",
    everyDays: 60,
    startDate: "2026-10-15",
  },
  {
    kind: "income",
    name: "Freelance retainer",
    category: "Freelance",
    amount: 30000,
    ...monthly(15),
  },
];

export const SAMPLE_ENTRIES: EntryInput[] = [
  {
    kind: "unexpected",
    description: "Brake repair",
    category: "Car",
    amount: 48000,
    date: "2026-11-23",
  },
  {
    kind: "expense",
    description: "Groceries",
    category: "Food",
    amount: 8640,
    date: "2026-11-21",
  },
  {
    kind: "expense",
    description: "Gas",
    category: "Transport",
    amount: 5210,
    date: "2026-11-22",
  },
  {
    kind: "income",
    description: "Side gig",
    category: "Income",
    amount: 12000,
    date: "2026-11-23",
  },
];
