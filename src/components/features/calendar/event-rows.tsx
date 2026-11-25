import type { EventRow } from "@/lib/calendar-view";

export function EventRows({ rows }: { rows: EventRow[] }) {
  if (rows.length === 0)
    return <div className="past">Nothing scheduled this day.</div>;
  return (
    <div className="list">
      {rows.map((row) => (
        <div key={row.key} className={`row ${row.paid ? "paid" : ""}`}>
          <div className="t">
            <b>
              <span className="dot" style={{ background: row.color }} />
              {row.name}
            </b>
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
