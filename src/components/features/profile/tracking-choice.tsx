import type { TrackingMode } from "@/domain/cycle-summary";

const OPTIONS: { value: TrackingMode; title: string; body: string }[] = [
  {
    value: "simple",
    title: "Just my paychecks",
    body: "Each payday starts fresh. Bills log themselves. You add only big one-offs.",
  },
  {
    value: "ledger",
    title: "My bank balance",
    body: "Follows your real balance. Needs every transaction logged.",
  },
];

export function TrackingChoice({
  value,
  onChange,
}: {
  value: TrackingMode;
  onChange: (mode: TrackingMode) => void;
}) {
  return (
    <fieldset aria-label="How to track" className="space-y-3">
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`block w-full rounded-card border-2 bg-card p-4 text-left ${
              selected ? "border-green" : "border-transparent"
            }`}
          >
            <p className="font-bold">{option.title}</p>
            <p className="mt-1 text-sm text-mute">{option.body}</p>
          </button>
        );
      })}
    </fieldset>
  );
}
