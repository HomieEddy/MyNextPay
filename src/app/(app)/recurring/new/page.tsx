import { RecurringForm } from "@/components/features/recurring/recurring-form";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { blankRecurringInput } from "@/lib/recurring-input";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default function NewRecurringPage() {
  return (
    <>
      <ScreenHeading
        title="New item"
        intro="A bill you pay on a schedule, or money that comes in on one."
      />
      <RecurringForm initial={blankRecurringInput("bill", appToday())} />
    </>
  );
}
