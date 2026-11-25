import type { Entry } from "@/server/repos/entry-repo";
import { centsToText } from "./money-text";
import type { EntryFormInput } from "./schemas/entry";

/** A saved entry, shaped for the entry form. */
export function toEntryInput(row: Entry): EntryFormInput {
  return {
    id: row.id,
    kind: row.kind,
    description: row.description,
    category: row.category,
    amount: centsToText(row.amount),
    date: row.date,
  };
}
