export function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-card bg-card p-4">
      <p className="text-[13px] font-semibold text-mute">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums whitespace-nowrap">
        {value}
      </p>
      <p className="text-[13px] text-mute">{detail}</p>
    </div>
  );
}
