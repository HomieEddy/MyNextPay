import { AddEntryForm } from "@/components/features/sheets/add-entry-form";
import { DeleteEntryButton } from "@/components/features/sheets/delete-entry-button";
import { Sheet } from "@/components/ui/sheet";
import { toEntryInput } from "@/lib/entry-input";
import { getDb } from "@/server/db/client";
import { findEntry } from "@/server/repos/entry-repo";

/** Container for the sheet that edits or deletes one logged entry. */
export function EntrySheet({
  id,
  closeHref,
}: {
  id: number;
  closeHref: string;
}) {
  const row = findEntry(getDb(), id);
  if (!row) return null;
  const title = row.kind === "income" ? "Edit income" : "Edit expense";
  return (
    <Sheet title={title} closeHref={closeHref}>
      <AddEntryForm initial={toEntryInput(row)} closeHref={closeHref} />
      <DeleteEntryButton id={row.id} closeHref={closeHref} />
    </Sheet>
  );
}
