import { AmountInput } from "@/components/ui/amount-input";
import type { StepProps } from "./step-props";

export function StepBalance({ values, errors, onChange }: StepProps) {
  return (
    <>
      <div className="my-7">
        <AmountInput
          id="openingBalance"
          label="Current balance"
          value={values.openingBalance}
          onChange={(openingBalance) => onChange({ openingBalance })}
        />
      </div>
      {errors.openingBalance && <p className="err">{errors.openingBalance}</p>}
      <div className="hint">
        Use your chequing balance as of today, with your last paycheck already
        in it.
      </div>
    </>
  );
}
