const RING_LENGTH = 150.8;

export function DayTiles({
  daysValue,
  daysLabel,
  ringFraction,
  dailyValue,
  dailyLabel,
}: {
  daysValue: string;
  daysLabel: string;
  ringFraction: number;
  dailyValue: string;
  dailyLabel: string;
}) {
  return (
    <div className="duo">
      <div className="tile">
        <svg className="dayring" viewBox="0 0 60 60" aria-hidden="true">
          <circle className="tr" cx="30" cy="30" r="24" />
          <circle
            className="pr"
            cx="30"
            cy="30"
            r="24"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={(RING_LENGTH * (1 - ringFraction)).toFixed(1)}
          />
        </svg>
        <div>
          <b className="num">{daysValue}</b>
          <span>{daysLabel}</span>
        </div>
      </div>
      <div className="tile">
        <div>
          <b className="num">{dailyValue}</b>
          <span>{dailyLabel}</span>
        </div>
      </div>
    </div>
  );
}
