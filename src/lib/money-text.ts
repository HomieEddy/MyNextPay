import type { Cents } from "@/domain/money";

/** Cents as the text a form field shows, such as 215000 -> "2150.00". */
export function centsToText(cents: Cents): string {
  return (cents / 100).toFixed(2);
}
