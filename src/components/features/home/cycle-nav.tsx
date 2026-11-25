import Link from "next/link";

const ARROW =
  "flex h-11 w-11 items-center justify-center rounded-full bg-card text-green text-xl font-bold";
const DISABLED =
  "flex h-11 w-11 items-center justify-center rounded-full bg-line/50 text-mute text-xl";

export function CycleNav({
  periodLabel,
  previousHref,
  nextHref,
}: {
  periodLabel: string;
  previousHref: string | null;
  nextHref: string | null;
}) {
  return (
    <nav aria-label="Pay cycles" className="flex items-center justify-between">
      {previousHref ? (
        <Link href={previousHref} aria-label="Previous cycle" className={ARROW}>
          ‹
        </Link>
      ) : (
        <span aria-hidden="true" className={DISABLED}>
          ‹
        </span>
      )}
      <p className="text-sm font-semibold text-ink">{periodLabel}</p>
      {nextHref ? (
        <Link href={nextHref} aria-label="Next cycle" className={ARROW}>
          ›
        </Link>
      ) : (
        <span aria-hidden="true" className={DISABLED}>
          ›
        </span>
      )}
    </nav>
  );
}
