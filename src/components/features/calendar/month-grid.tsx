import Link from "next/link";
import type { CalendarCell } from "@/lib/calendar-view";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function MonthGrid({
  cells,
  hrefFor,
}: {
  cells: CalendarCell[];
  hrefFor: Record<string, string>;
}) {
  return (
    <div className="calbox">
      <div className="g7">
        {WEEKDAYS.map((day, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed weekday header
          <div key={i} className="dow">
            {day}
          </div>
        ))}
        {cells.map((cell) => (
          <Link
            key={cell.date}
            href={hrefFor[cell.date]}
            scroll={false}
            className={cell.className}
            aria-label={cell.label}
          >
            <span className="dn">{cell.day}</span>
            <span className="dots">
              {cell.dots.map((dot, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: dots have no identity
                <i key={i} className={dot} />
              ))}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
