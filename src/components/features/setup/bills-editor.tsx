import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import type { SetupInput } from "@/lib/schemas/setup";

type Bill = SetupInput["bills"][number];

const BLANK_BILL: Bill = { name: "", amount: "", dayOfMonth: 1 };

export function BillsEditor({
  bills,
  onChange,
}: {
  bills: Bill[];
  onChange: (bills: Bill[]) => void;
}) {
  const update = (index: number, change: Partial<Bill>) =>
    onChange(
      bills.map((bill, i) => (i === index ? { ...bill, ...change } : bill)),
    );
  const remove = (index: number) =>
    onChange(bills.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      {bills.map((bill, index) => (
        // Rows have no stable id and are only edited in place, so the index is the key.
        // biome-ignore lint/suspicious/noArrayIndexKey: see comment above
        <div key={index} className="space-y-3 rounded-card bg-card p-4">
          <TextField
            label="Bill"
            name={`bill-name-${index}`}
            value={bill.name}
            onChange={(event) => update(index, { name: event.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Amount"
              name={`bill-amount-${index}`}
              inputMode="decimal"
              placeholder="0.00"
              value={bill.amount}
              onChange={(event) =>
                update(index, { amount: event.target.value })
              }
            />
            <TextField
              label="Day of month"
              name={`bill-day-${index}`}
              type="number"
              inputMode="numeric"
              min={1}
              max={31}
              value={bill.dayOfMonth}
              onChange={(event) =>
                update(index, { dayOfMonth: Number(event.target.value) })
              }
            />
          </div>
          <Button variant="ghost" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        onClick={() => onChange([...bills, { ...BLANK_BILL }])}
      >
        Add a bill
      </Button>
    </div>
  );
}
