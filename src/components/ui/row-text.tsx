/** The title and hint inside a grouped-list row. */
export function RowText({
  title,
  hint,
  danger = false,
}: {
  title: string;
  hint: string;
  danger?: boolean;
}) {
  return (
    <span className="t">
      <b className={danger ? "danger" : undefined}>{title}</b>
      <span>{hint}</span>
    </span>
  );
}
