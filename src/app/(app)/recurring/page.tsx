import { RecurringList } from "@/components/features/recurring/recurring-list";
import { AddLink } from "@/components/ui/add-link";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { SegmentedLinks } from "@/components/ui/segmented-links";
import { getDb } from "@/server/db/client";
import { loadRecurringRows } from "@/server/queries/load-recurring-rows";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default async function RecurringPage({
  searchParams,
}: PageProps<"/recurring">) {
  const { t } = await searchParams;
  const income = t === "income";
  const { bills, incomes } = loadRecurringRows(getDb(), appToday());
  const newHref = income ? "/recurring/new?kind=income" : "/recurring/new";
  return (
    <>
      <ScreenHeading
        title="Recurring"
        action={<AddLink href={newHref} label="Add a recurring item" />}
      />
      <SegmentedLinks
        label="Kind"
        links={[
          { href: "/recurring", label: "Bills", active: !income },
          {
            href: "/recurring?t=income",
            label: "Income streams",
            active: income,
          },
        ]}
      />
      <RecurringList
        rows={income ? incomes : bills}
        income={income}
        empty={
          income
            ? "No income streams yet. Your paycheck is counted already."
            : "No bills yet."
        }
      />
    </>
  );
}
