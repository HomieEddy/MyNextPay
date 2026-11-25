import type { EntryRow } from "@/lib/entry-rows";

export function EntryList({
  rows,
  empty,
}: {
  rows: EntryRow[];
  empty: string;
}) {
  if (rows.length === 0) return <div className="past">{empty}</div>;
  return (
    <div className="list">
      {rows.map((row) => (
        <div key={row.id} className="row">
          <div className="t">
            <b>{row.name}</b>
            <span>{row.detail}</span>
          </div>
          <span className={`a num ${row.income ? "pos" : ""}`}>
            {row.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
