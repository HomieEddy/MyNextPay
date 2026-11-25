import type { EntryFormInput } from "@/lib/schemas/entry";

export const SIMPLE_CATEGORIES = ["Car", "Home", "Health", "Family", "Other"];
export const LEDGER_CATEGORIES = ["Food", "Transport", "Fun", "Home", "Other"];

export function categoriesFor(kind: EntryFormInput["kind"]): string[] {
  if (kind === "unexpected") return SIMPLE_CATEGORIES;
  return kind === "income" ? ["Income"] : LEDGER_CATEGORIES;
}
