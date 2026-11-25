export type DonutPart = {
  label: string;
  value: number;
  display: string;
  color: string;
};

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Hand-drawn SVG donut with a legend. Every slice is also listed in text. */
export function Donut({
  parts,
  center,
  caption,
}: {
  parts: DonutPart[];
  center: string;
  caption: string;
}) {
  const total = parts.reduce((sum, part) => sum + part.value, 0) || 1;
  let offset = 0;
  return (
    <div className="donut">
      <div className="dwrap">
        <svg viewBox="0 0 150 150" aria-hidden="true">
          <circle cx="75" cy="75" r={RADIUS} stroke="var(--color-line)" />
          {parts.map((part) => {
            const length = (part.value / total) * CIRCUMFERENCE;
            const slice = (
              <circle
                key={part.label}
                cx="75"
                cy="75"
                r={RADIUS}
                stroke={part.color}
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return slice;
          })}
        </svg>
        <div className="dmid">
          <b className="num">{center}</b>
          <span>{caption}</span>
        </div>
      </div>
      <div className="leg">
        {parts.map((part) => (
          <div key={part.label}>
            <i style={{ background: part.color }} />
            <span>{part.label}</span>
            <em className="num">{part.display}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
