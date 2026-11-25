import type { TrackingMode } from "@/domain/cycle-summary";

const OPTIONS: {
  value: TrackingMode;
  title: string;
  body: string;
  tag: string;
}[] = [
  {
    value: "simple",
    title: "Just my paychecks",
    body: "Each payday starts fresh. Your paycheck minus that cycle's bills is what you can spend. Only log the big surprises, like a car repair.",
    tag: "Low effort",
  },
  {
    value: "ledger",
    title: "Follow my bank balance",
    body: "Start from your real balance and log every expense and income. The most exact, but it takes discipline.",
    tag: "Most exact",
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
    <fieldset aria-label="How to track">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          className={`opt ${option.value === value ? "on" : ""}`}
          onClick={() => onChange(option.value)}
        >
          <b>{option.title}</b>
          <span className="d">{option.body}</span>
          <span className="tag">{option.tag}</span>
        </button>
      ))}
    </fieldset>
  );
}
