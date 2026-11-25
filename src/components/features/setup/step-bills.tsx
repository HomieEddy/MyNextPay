import { formatMoney, parseAmount } from "@/domain/money";
import { type Bill, BillRow } from "./bill-row";
import type { StepProps } from "./step-props";

const COMMON = [
  "Rent",
  "Phone",
  "Internet",
  "Hydro",
  "Car insurance",
  "Streaming",
  "Gym",
];

export function StepBills({ values, errors, onChange }: StepProps) {
  const bills = values.bills;
  const names = new Set(bills.map((bill) => bill.name));
  const total = bills.reduce(
    (sum, bill) => sum + (parseAmount(bill.amount) ?? 0),
    0,
  );
  const set = (next: Bill[]) => onChange({ bills: next });
  const add = (name: string) =>
    set([...bills, { name, amount: "", dayOfMonth: 1 }]);

  return (
    <>
      <div className="cats">
        {COMMON.map((name) => (
          <button
            key={name}
            type="button"
            disabled={names.has(name)}
            onClick={() => add(name)}
          >
            {name}
          </button>
        ))}
        <button type="button" onClick={() => add("")}>
          + Other
        </button>
      </div>
      {bills.length > 0 && (
        <div className="obr-h">
          <span>Bill</span>
          <span className="text-right">Amount</span>
          <span>Due day</span>
          <span />
        </div>
      )}
      {bills.map((bill, index) => (
        <BillRow
          // Rows have no stable id and are only edited in place, so the index is the key.
          // biome-ignore lint/suspicious/noArrayIndexKey: see comment above
          key={index}
          bill={bill}
          onChange={(change) =>
            set(bills.map((b, i) => (i === index ? { ...b, ...change } : b)))
          }
          onRemove={() => set(bills.filter((_, i) => i !== index))}
        />
      ))}
      {bills.length > 0 && (
        <p className="small mx-1 mt-2.5">
          {bills.length} bill{bills.length === 1 ? "" : "s"} ·{" "}
          {formatMoney(total)} a month
        </p>
      )}
      {errors.bills && <p className="err">{errors.bills}</p>}
    </>
  );
}
