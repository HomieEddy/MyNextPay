import { ordinal } from "@/domain/describe-schedule";
import type { SetupInput } from "@/lib/schemas/setup";

export type Bill = SetupInput["bills"][number];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function BillRow({
  bill,
  onChange,
  onRemove,
}: {
  bill: Bill;
  onChange: (change: Partial<Bill>) => void;
  onRemove: () => void;
}) {
  const name = bill.name || "Bill";
  return (
    <div className="obr">
      <input
        aria-label="Bill name"
        placeholder="Name"
        value={bill.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />
      <input
        className="oba num"
        aria-label={`${name} amount`}
        inputMode="decimal"
        placeholder="0.00"
        value={bill.amount}
        onChange={(e) => onChange({ amount: e.target.value })}
      />
      <select
        aria-label={`${name} due day`}
        value={bill.dayOfMonth}
        onChange={(e) => onChange({ dayOfMonth: Number(e.target.value) })}
      >
        {DAYS.map((day) => (
          <option key={day} value={day}>
            {ordinal(day)}
          </option>
        ))}
      </select>
      <button type="button" aria-label={`Remove ${name}`} onClick={onRemove}>
        ×
      </button>
    </div>
  );
}
