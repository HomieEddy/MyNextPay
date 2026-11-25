import { AmountInput } from "@/components/ui/amount-input";
import { Segmented } from "@/components/ui/segmented";
import { TextField } from "@/components/ui/text-field";
import type { StepProps } from "./step-props";

export function StepPay({ values, errors, onChange }: StepProps) {
  return (
    <>
      <TextField
        label="What should we call you?"
        name="name"
        placeholder="Optional"
        autoComplete="given-name"
        value={values.name}
        onChange={(event) => onChange({ name: event.target.value })}
        error={errors.name}
      />
      <div className="field">Take-home pay, per paycheck</div>
      <AmountInput
        id="payAmount"
        label="Take-home pay"
        value={values.payAmount}
        onChange={(payAmount) => onChange({ payAmount })}
      />
      {errors.payAmount && <p className="err">{errors.payAmount}</p>}
      <div className="field">How often?</div>
      <Segmented
        label="How often you get paid"
        value={values.payFrequency}
        onChange={(payFrequency) => onChange({ payFrequency })}
        options={[
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Every 2 weeks" },
          { value: "monthly", label: "Monthly" },
        ]}
      />
      <TextField
        label="Most recent payday"
        name="anchorPayday"
        type="date"
        value={values.anchorPayday}
        onChange={(event) => onChange({ anchorPayday: event.target.value })}
        error={errors.anchorPayday}
      />
    </>
  );
}
