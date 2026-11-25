import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import type { RecurringRow } from "@/server/queries/recurring-rows";

export function RecurringList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: RecurringRow[];
  empty: string;
}) {
  return (
    <Section title={title}>
      {rows.length === 0 && <p className="p-4 text-mute">{empty}</p>}
      {rows.map((row, index) => (
        <Link
          key={row.id}
          href={`/recurring/${row.id}`}
          className={`flex min-h-16 items-center gap-3 px-4 py-3 ${index > 0 ? "border-t border-line" : ""}`}
        >
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-semibold">
              {row.name}
              {row.autoPay && <Chip tone="green">Auto</Chip>}
            </p>
            <p className="text-[13px] text-mute">{row.meta}</p>
          </div>
          <p className="font-bold tabular-nums whitespace-nowrap">
            {row.amount}
          </p>
        </Link>
      ))}
    </Section>
  );
}
