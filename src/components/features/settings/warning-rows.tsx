import { SettingsList } from "@/components/ui/settings-list";
import { SettingsRow } from "@/components/ui/settings-row";
import { Switch } from "@/components/ui/switch";
import type { SettingsGroupProps } from "./settings-props";

export function WarningRows({ values, errors, onChange }: SettingsGroupProps) {
  return (
    <SettingsList title="Low-balance warning">
      <SettingsRow
        label="Warn me on Home"
        hint="When safe-to-spend drops below the floor"
        htmlFor="sWarn"
      >
        <Switch
          id="sWarn"
          checked={values.lowBalanceWarning}
          onChange={(lowBalanceWarning) => onChange({ lowBalanceWarning })}
        />
      </SettingsRow>
      <SettingsRow
        label="Floor"
        hint="Below this, a cycle is tight"
        error={errors.floor}
        htmlFor="sFloor"
      >
        <input
          id="sFloor"
          className="rin num"
          inputMode="decimal"
          value={values.floor}
          onChange={(e) => onChange({ floor: e.target.value })}
        />
      </SettingsRow>
    </SettingsList>
  );
}
