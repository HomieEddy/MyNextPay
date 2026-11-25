import type { EventRow } from "@/lib/calendar-view";

export type WeekDay = {
  date: string;
  weekday: string;
  day: number;
  today: boolean;
  rows: EventRow[];
};

export function WeekList({ days }: { days: WeekDay[] }) {
  return (
    <div className="list mb-2.5">
      {days.map((day) => (
        <div key={day.date} className={`wk ${day.today ? "today" : ""}`}>
          <div className="wd">
            {day.weekday}
            <b>{day.day}</b>
          </div>
          <div>
            {day.rows.length === 0 && <div className="none">Nothing due</div>}
            {day.rows.map((row) => (
              <div key={row.key} className={`ent ${row.paid ? "pd" : ""}`}>
                <span>
                  <span className="dot" style={{ background: row.color }} />
                  {row.name}
                </span>
                <span className={`num ${row.income ? "pos" : ""}`}>
                  {row.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
