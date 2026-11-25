export type SegmentOption<T extends string> = { value: T; label: string };

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <fieldset aria-label={label} className="flex rounded-2xl bg-line/60 p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`min-h-10 flex-1 rounded-xl text-sm font-semibold transition-colors ${
              selected ? "bg-card text-ink shadow-sm" : "text-mute"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}
