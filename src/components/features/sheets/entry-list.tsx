import Link from "next/link";
import type { EntryRow } from "@/lib/entry-rows";

export function EntryList({
  rows,
  empty,
  editHref,
}: {
  rows: EntryRow[];
  empty: string;
  editHref: (id: number) => string;
}) {
  if (rows.length === 0) return <div className="past">{empty}</div>;
  return (
    <div className="list">
      {rows.map((row) => (
        <Link
          key={row.id}
          href={editHref(row.id)}
          scroll={false}
          className="row"
        >
          <div className="t">
            <b>{row.name}</b>
            <span>{row.detail}</span>
          </div>
          <span className={`a num ${row.income ? "pos" : ""}`}>
            {row.amount}
          </span>
        </Link>
      ))}
    </div>
  );
}
