import { Donut, type DonutPart } from "@/components/ui/donut";
import type { EntryRow } from "@/lib/entry-rows";
import { EntryList } from "./entry-list";

export function SpendSheet({
  parts,
  center,
  caption,
  entries,
  simple,
}: {
  parts: DonutPart[];
  center: string;
  caption: string;
  entries: EntryRow[];
  simple: boolean;
}) {
  return (
    <>
      <Donut parts={parts} center={center} caption={caption} />
      <div className="sec">{simple ? "Unexpected expenses" : "Ledger"}</div>
      <EntryList
        rows={entries}
        empty={
          simple
            ? "None this cycle. Use the orange + for big one-offs like a car repair."
            : "Nothing logged yet."
        }
      />
      {simple && (
        <p className="small mx-1 mt-3">
          Everyday spending isn't logged in Simple mode. It comes out of your
          free cash.
        </p>
      )}
    </>
  );
}
