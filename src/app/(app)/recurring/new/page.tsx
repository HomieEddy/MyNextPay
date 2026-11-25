import { RecurringForm } from "@/components/features/recurring/recurring-form";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { blankRecurringInput } from "@/lib/recurring-input";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default async function NewRecurringPage({
  searchParams,
}: PageProps<"/recurring/new">) {
  const { kind } = await searchParams;
  const initial = blankRecurringInput(
    kind === "income" ? "income" : "bill",
    appToday(),
  );
  return (
    <>
      <ScreenHeading title="New item" />
      <RecurringForm initial={initial} />
    </>
  );
}
