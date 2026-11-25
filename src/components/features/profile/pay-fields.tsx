import { Segmented } from "@/components/ui/segmented";
import { TextField } from "@/components/ui/text-field";
import type { ProfileInput } from "@/lib/schemas/profile";

type Props = {
  values: ProfileInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<ProfileInput>) => void;
};

export function PayFields({ values, errors, onChange }: Props) {
  return (
    <>
      <TextField
        label="Your name"
        name="name"
        autoComplete="given-name"
        value={values.name}
        onChange={(event) => onChange({ name: event.target.value })}
        error={errors.name}
      />
      <TextField
        label="Pay amount, after tax"
        name="payAmount"
        inputMode="decimal"
        placeholder="0.00"
        value={values.payAmount}
        onChange={(event) => onChange({ payAmount: event.target.value })}
        error={errors.payAmount}
      />
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
        label="A recent payday"
        name="anchorPayday"
        type="date"
        value={values.anchorPayday}
        onChange={(event) => onChange({ anchorPayday: event.target.value })}
        error={errors.anchorPayday}
      />
    </>
  );
}
