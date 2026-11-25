import { Chip } from "@/components/ui/chip";
import type { HomeView } from "@/lib/home-view";

const TONE = { healthy: "green", tight: "orange", deficit: "neutral" } as const;

export function SafeHero({
  view,
}: {
  view: Pick<
    HomeView,
    "amount" | "status" | "statusLabel" | "paydayLabel" | "periodLabel"
  >;
}) {
  return (
    <div className="rounded-sheet bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between text-[13px] text-mute">
        <span>{view.periodLabel}</span>
        <Chip tone={view.status === "healthy" ? "green" : TONE[view.status]}>
          {view.statusLabel}
        </Chip>
      </div>
      <p className="mt-4 text-[13px] font-semibold text-mute">Safe to spend</p>
      <p className="mt-1 text-[44px] leading-none font-extrabold tracking-tight tabular-nums whitespace-nowrap">
        {view.amount}
      </p>
      <p className="mt-3 text-sm text-mute">{view.paydayLabel}</p>
    </div>
  );
}
