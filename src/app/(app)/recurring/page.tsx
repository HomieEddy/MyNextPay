import Link from "next/link";
import { RecurringList } from "@/components/features/recurring/recurring-list";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { getDb } from "@/server/db/client";
import { loadRecurringRows } from "@/server/queries/load-recurring-rows";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default function RecurringPage() {
  const { bills, incomes } = loadRecurringRows(getDb(), appToday());
  return (
    <>
      <ScreenHeading
        title="Recurring"
        intro="Bills and paychecks that repeat. NextPay counts them for you."
      />
      <Link
        href="/recurring/new"
        className="flex min-h-12 items-center justify-center rounded-2xl bg-orange font-bold text-white"
      >
        Add a bill or income
      </Link>
      <RecurringList title="Bills" rows={bills} empty="No bills yet." />
      <RecurringList
        title="Income"
        rows={incomes}
        empty="No extra income yet."
      />
    </>
  );
}
