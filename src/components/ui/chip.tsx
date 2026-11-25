import type { CycleStatus } from "@/domain/status";

/** Status pill with a dot. The label is always shown, never color alone. */
export function Chip({
  status,
  label,
}: {
  status: CycleStatus;
  label: string;
}) {
  return <span className={`chip ${status}`}>{label}</span>;
}
