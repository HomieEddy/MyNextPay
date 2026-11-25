import { SettingsList } from "@/components/ui/settings-list";
import { SettingsRow } from "@/components/ui/settings-row";
import type { ProfileInput } from "@/lib/schemas/profile";
import type { SettingsGroupProps } from "./settings-props";

const FREQUENCIES: { value: ProfileInput["payFrequency"]; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every 2 weeks" },
  { value: "monthly", label: "Monthly" },
];

export function PayRows({ values, errors, onChange }: SettingsGroupProps) {
  return (
    <SettingsList title="Pay profile">
      <SettingsRow label="Name" error={errors.name} htmlFor="sName">
        <input
          id="sName"
          className="rin"
          value={values.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </SettingsRow>
      <SettingsRow
        label="Anchor payday"
        hint="Any past payday"
        error={errors.anchorPayday}
        htmlFor="sAnchor"
      >
        <input
          id="sAnchor"
          type="date"
          className="rin w-auto"
          value={values.anchorPayday}
          onChange={(e) => onChange({ anchorPayday: e.target.value })}
        />
      </SettingsRow>
      <SettingsRow label="Pay frequency" htmlFor="sFreq">
        <select
          id="sFreq"
          className="rin"
          value={values.payFrequency}
          onChange={(e) => {
            const match = FREQUENCIES.find((f) => f.value === e.target.value);
            if (match) onChange({ payFrequency: match.value });
          }}
        >
          {FREQUENCIES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </SettingsRow>
      <SettingsRow
        label="Take-home pay"
        hint="Per paycheck"
        error={errors.payAmount}
        htmlFor="sPay"
      >
        <input
          id="sPay"
          className="rin num"
          inputMode="decimal"
          value={values.payAmount}
          onChange={(e) => onChange({ payAmount: e.target.value })}
        />
      </SettingsRow>
      {values.mode === "ledger" && (
        <SettingsRow
          label="Opening balance"
          hint="Where the ledger starts"
          error={errors.openingBalance}
          htmlFor="sOpen"
        >
          <input
            id="sOpen"
            className="rin num"
            inputMode="decimal"
            value={values.openingBalance}
            onChange={(e) => onChange({ openingBalance: e.target.value })}
          />
        </SettingsRow>
      )}
    </SettingsList>
  );
}
