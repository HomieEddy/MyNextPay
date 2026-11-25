import type { HomeRow } from "@/lib/home-view";

const BAR = {
  orange: "bg-orange",
  green: "bg-green",
  char: "bg-char",
} as const;

export function CardStack({ rows }: { rows: HomeRow[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {rows.map((row) => (
        <li
          key={row.label}
          className="flex items-center gap-4 rounded-card bg-card p-4"
        >
          <span
            className={`h-11 w-1.5 rounded-full ${BAR[row.tone]}`}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{row.label}</p>
            <p className="text-[13px] text-mute">{row.detail}</p>
          </div>
          <p className="font-bold tabular-nums whitespace-nowrap">
            {row.value}
          </p>
        </li>
      ))}
    </ul>
  );
}
