# Product

## What it is

PaycheckFlow is a personal cash-flow app built around paydays instead of calendar months. It answers one question: **how much can I safely spend before my next payday?** Every figure in the app is scoped to the pay cycle you're looking at, so a tight week shows up before it arrives.

It is a single-person tool. One person enters their own pay schedule, bills, income, and spending. Data stays in the app's own storage — nothing is shared, synced to a bank, or sent anywhere else.

## Who it's for

Someone paid on a fixed, frequent schedule — biweekly by default — who thinks in terms of "the next paycheck," not "this month." They open the app in short bursts: a glance before a purchase, a weekly check on what's due, a moment to log an expense. They want a quiet, fast, exact tool, not a coach or a game.

## The money model

- **Cycles are the unit of everything.** A cycle runs from one payday to the next, anchored to a payday and a frequency (weekly, biweekly, or monthly). Previous, current, and next cycles are all navigable, and a custom date window can be inspected too.
- **Safe-to-spend** = opening balance + the cycle's expected income − bills still due in that cycle, adjusted by any one-off transactions dated inside it.
- **Cycles are self-contained.** A surplus or shortfall never carries into the next cycle; each payday restarts the math. This is the product's defining rule.
- **Every figure is traceable.** The headline number, the income it assumes, the bills it reserves, and the transactions that moved it are all visible in the same view.
- **Status is explicit.** A cycle is *healthy* (at or above your floor), *tight* (below your floor), or in *deficit* (bills exceed income). A red number is shown plainly.
- **Daily allowance** divides what's left by the days remaining in the cycle, giving a per-day spending guide.

## What it does

### Dashboard

- A cycle navigator for previous / current / next period, plus a custom date range.
- A safe-to-spend hero with days left, daily allowance, and status.
- Supporting figures: total expected income (including the number of paychecks), committed bills, and the net effect of one-off transactions.
- A low-balance banner that appears when the balance drops below your floor, explains the shortfall and days until payday, and lets you adjust the floor inline.
- A safe-to-spend forecast for this cycle and the next two, as a small comparison chart plus per-cycle cards with status, bills landing, and daily allowance.
- The cycle's transaction ledger: one-off expenses and income with description, optional category, amount, and date; search, type filter, category filter, edit, and delete.
- Three sub-views: Summary, Bills Due, and Spending.

### Recurring

- One master list of scheduled commitments, split into fixed bills and secondary income streams.
- Schedules: a weekday every 1–4 weeks, a day of the month (1st–31st), or a custom day interval from a start date.
- Per-item category, amount, name, start date, and edit/delete.
- **Auto-pay** per bill: it settles into the ledger automatically once its due date arrives.
- Search and category filtering over the whole schedule.

### Cycles

- A horizon of the next six pay periods, each showing inflow, bills due, safe-to-spend, and status.
- Tight and deficit cycles call attention to themselves with a reason ("clustered bills," "bills exceed income").
- A detail view for any cycle: projected balance, daily allowance, cycle length, income breakdown, bill-by-bill list, one-off transactions, and warnings.
- Jump from any forecast cycle straight to that cycle on the Dashboard.

### Calendar

- Month and week views of every bill, income stream, and payday by date.
- Paid bills are visually marked off; unpaid ones stand out.
- Tap any entry for amount, date, category, and paid status.

### Bills Due

- Every scheduled bill falling due in the active cycle, with amounts and categories.
- Mark one bill paid, or mark all unpaid bills paid at once.
- Paid bills are visually muted and feed the ledger as bill payments.

### Spending

- A donut breakdown of the active cycle, switchable between a high-level view (income vs. committed vs. free cash) and a by-category view.
- Percentages alongside absolute amounts: committed load, free cash margin, and each category's share.
- Deficits are labelled as such rather than hidden behind a positive-looking chart.

### Settings

- Pay profile: name, anchor payday, pay frequency, expected take-home pay, and opening balance (the starting point for the ledger).
- Low-balance warning: on/off and the floor amount.
- Appearance: light, system, or dark.
- Data: download a full backup, restore from a backup file, reload the sample data set, or wipe everything and start clean.

### Throughout

- Keyboard shortcuts: `1`–`5` switch tabs, `?` opens in-app help, `Esc` closes dialogs.
- The in-app help explains the safe-to-spend formula, status meanings, the floor, and cycle navigation.
- Light, dark, and system themes; a layout that works as a desktop sidebar or a mobile bottom-nav app.
- Status is never carried by color alone — labels and amounts state the meaning.

## What it deliberately doesn't do

- No bank connections or automatic transaction import — every number is entered or scheduled by hand.
- No multi-user sharing, accounts, or social features.
- No investing, net-worth tracking, or long-term planning beyond the six-cycle horizon.
- No gamification, coaching, or notifications outside the in-app low-balance banner.

## Accessibility

Full keyboard access to navigation, forms, and dialogs; visible focus states; body text at or above 4.5:1 contrast; and motion limited to state changes, respecting reduced-motion preferences.
