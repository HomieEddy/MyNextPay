import { AddEntryForm } from "@/components/features/sheets/add-entry-form";
import { BillsSheet } from "@/components/features/sheets/bills-sheet";
import { categoriesFor } from "@/components/features/sheets/entry-categories";
import { IncomeSheet } from "@/components/features/sheets/income-sheet";
import { toSheetRows } from "@/components/features/sheets/sheet-rows";
import { SpendSheet } from "@/components/features/sheets/spend-sheet";
import { Sheet } from "@/components/ui/sheet";
import type { CycleSummary } from "@/domain/cycle-summary";
import { formatMoney } from "@/domain/money";
import { toEntryRows } from "@/lib/entry-rows";
import { offsetHref } from "@/lib/home-view";
import { spendParts } from "@/lib/spend-parts";
import { getDb } from "@/server/db/client";
import { loadCycleEntries } from "@/server/queries/load-cycle-entries";
import { appToday } from "@/server/today";

type Props = { sheet: string; summary: CycleSummary; offset: number };

/** Container for the sheets that open over Home. Picks the data each sheet needs. */
export function HomeSheet({ sheet, summary, offset }: Props) {
  const closeHref = offsetHref(offset) ?? "/";
  const simple = summary.mode === "simple";

  if (sheet === "bills") {
    return (
      <Sheet title="Bills this cycle" closeHref={closeHref}>
        <BillsSheet
          rows={toSheetRows(summary.billOccurrences, "due")}
          total={formatMoney(summary.bills)}
        />
      </Sheet>
    );
  }
  if (sheet === "income") {
    return (
      <Sheet title="Income" closeHref={closeHref}>
        <IncomeSheet
          rows={toSheetRows(summary.incomeOccurrences, "on")}
          total={formatMoney(summary.income)}
          simple={simple}
        />
      </Sheet>
    );
  }
  if (sheet === "spend") {
    const entries = loadCycleEntries(getDb(), summary.cycle).filter(
      (e) => !simple || e.kind === "unexpected",
    );
    return (
      <Sheet title={simple ? "Breakdown" : "Spending"} closeHref={closeHref}>
        <SpendSheet
          parts={spendParts(summary)}
          center={formatMoney(summary.safeToSpend)}
          caption={summary.safeToSpend < 0 ? "deficit" : "free cash"}
          entries={toEntryRows(entries)}
          simple={simple}
        />
      </Sheet>
    );
  }
  if (sheet !== "add") return null;

  const kind = simple ? "unexpected" : "expense";
  const initial = {
    kind,
    description: "",
    category: categoriesFor(kind)[0],
    amount: "",
    date: appToday(),
  } as const;
  return (
    <Sheet
      title={simple ? "Unexpected expense" : "Log a transaction"}
      closeHref={closeHref}
    >
      <AddEntryForm initial={initial} closeHref={closeHref} />
    </Sheet>
  );
}
