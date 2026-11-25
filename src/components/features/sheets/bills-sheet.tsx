import { BillCheck } from "./bill-check";
import type { SheetRow } from "./sheet-rows";

export function BillsSheet({
  rows,
  total,
}: {
  rows: SheetRow[];
  total: string;
}) {
  if (rows.length === 0)
    return <div className="past">No bills due this cycle.</div>;
  return (
    <>
      <div className="list">
        {rows.map((row) => (
          <BillCheck
            key={row.key}
            itemId={row.itemId}
            dueDate={row.date}
            name={row.name}
            paid={row.paid}
          >
            <div className="t">
              <b>{row.name}</b>
              <span>{row.detail}</span>
            </div>
            <span className="a num">{row.amount}</span>
          </BillCheck>
        ))}
      </div>
      <p className="small mt-3">
        Total reserved: {total}. Paying a bill doesn't change safe-to-spend; it
        was already set aside.
      </p>
    </>
  );
}
