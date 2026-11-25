import { Chip } from "@/components/ui/chip";
import type { CycleStatus } from "@/domain/status";
import { CountUp } from "./count-up";

export function SafeHero({
  caption,
  cents,
  status,
  statusLabel,
}: {
  caption: string;
  cents: number;
  status: CycleStatus;
  statusLabel: string;
}) {
  return (
    <div className="hero">
      <div className="cap">{caption}</div>
      <div className={`big num ${cents < 0 ? "neg" : ""}`}>
        <CountUp cents={cents} />
      </div>
      <Chip status={status} label={statusLabel} />
    </div>
  );
}
