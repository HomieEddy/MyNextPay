import { notFound } from "next/navigation";
import { RecurringForm } from "@/components/features/recurring/recurring-form";
import { RemoveButton } from "@/components/features/recurring/remove-button";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { toRecurringInput } from "@/lib/recurring-input";
import { getDb } from "@/server/db/client";
import { findRecurringItem } from "@/server/repos/recurring-repo";

export const dynamic = "force-dynamic";

export default async function EditRecurringPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = findRecurringItem(getDb(), Number(id));
  if (!row) notFound();

  return (
    <>
      <ScreenHeading title="Edit item" />
      <RecurringForm initial={toRecurringInput(row)} />
      <div className="mt-4">
        <RemoveButton id={row.id} />
      </div>
    </>
  );
}
