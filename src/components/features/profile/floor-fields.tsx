import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import type { ProfileInput } from "@/lib/schemas/profile";

type Props = {
  values: ProfileInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<ProfileInput>) => void;
};

export function FloorFields({ values, errors, onChange }: Props) {
  return (
    <>
      <TextField
        label="Floor: the least you want to keep"
        name="floor"
        inputMode="decimal"
        placeholder="0.00"
        value={values.floor}
        onChange={(event) => onChange({ floor: event.target.value })}
        error={errors.floor}
      />
      <Switch
        label="Warn me when I'm getting tight"
        checked={values.lowBalanceWarning}
        onChange={(lowBalanceWarning) => onChange({ lowBalanceWarning })}
      />
    </>
  );
}
