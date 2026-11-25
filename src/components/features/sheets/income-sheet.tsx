import type { SheetRow } from "./sheet-rows";

export function IncomeSheet({
  rows,
  total,
  simple,
}: {
  rows: SheetRow[];
  total: string;
  simple: boolean;
}) {
  return (
    <>
      <div className="list">
        {rows.map((row) => (
          <div key={row.key} className="row">
            <div className="t">
              <b>{row.name}</b>
              <span>{row.detail}</span>
            </div>
            <span className="a num pos">+{row.amount}</span>
          </div>
        ))}
      </div>
      <p className="small mt-3">
        {simple
          ? "Simple mode: no bank balance to track. Every payday starts fresh, and nothing carries over."
          : `Total coming in this cycle: ${total}.`}
      </p>
    </>
  );
}
