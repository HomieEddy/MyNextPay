export function Progress({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div
      className="prog"
      style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
      role="progressbar"
      aria-label="Setup progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
    >
      {Array.from({ length: total }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative segments
        <i key={i} className={i <= current ? "on" : ""} />
      ))}
    </div>
  );
}
