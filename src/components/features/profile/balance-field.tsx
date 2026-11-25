import { TextField } from "@/components/ui/text-field";
import type { ProfileInput } from "@/lib/schemas/profile";

export function BalanceField({
  value,
  error,
  onChange,
}: {
  value: ProfileInput["openingBalance"];
  error?: string;
  onChange: (openingBalance: string) => void;
}) {
  return (
    <TextField
      label="What's in your account today"
      name="openingBalance"
      inputMode="decimal"
      placeholder="0.00"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={error}
    />
  );
}
