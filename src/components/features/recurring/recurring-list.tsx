import Link from "next/link";
import type { RecurringRow } from "@/server/queries/recurring-rows";

export function RecurringList({
  rows,
  income,
  empty,
}: {
  rows: RecurringRow[];
  income: boolean;
  empty: string;
}) {
  if (rows.length === 0) return <div className="past">{empty}</div>;
  return (
    <div className="list">
      {rows.map((row) => (
        <Link key={row.id} href={`/recurring/${row.id}`} className="row rowbtn">
          <span className="t">
            <b>
              {row.name}
              {row.autoPay && !income && <span className="auto">Auto-pay</span>}
            </b>
            <span>{row.meta}</span>
          </span>
          <span className={`a num ${income ? "pos" : ""}`}>{row.amount}</span>
        </Link>
      ))}
    </div>
  );
}
