import { BalanceField } from "@/components/features/profile/balance-field";
import { TrackingChoice } from "@/components/features/profile/tracking-choice";
import type { SetupInput } from "@/lib/schemas/setup";

type Props = {
  values: SetupInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<SetupInput>) => void;
};

export function StepTracking({ values, errors, onChange }: Props) {
  return (
    <>
      <TrackingChoice
        value={values.mode}
        onChange={(mode) => onChange({ mode })}
      />
      {values.mode === "ledger" && (
        <BalanceField
          value={values.openingBalance}
          error={errors.openingBalance}
          onChange={(openingBalance) => onChange({ openingBalance })}
        />
      )}
    </>
  );
}
