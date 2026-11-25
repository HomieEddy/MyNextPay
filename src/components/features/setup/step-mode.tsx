import { TrackingChoice } from "@/components/features/profile/tracking-choice";
import type { StepProps } from "./step-props";

export function StepMode({ values, onChange }: StepProps) {
  return (
    <TrackingChoice
      value={values.mode}
      onChange={(mode) => onChange({ mode })}
    />
  );
}
