import { SettingsList } from "@/components/ui/settings-list";
import { SettingsRow } from "@/components/ui/settings-row";
import type { SettingsGroupProps } from "./settings-props";

const HINT = {
  simple: "Resets every payday, nothing to log",
  ledger: "Follows your bank balance, log every purchase",
};

export function TrackingRows({ values, onChange }: SettingsGroupProps) {
  return (
    <SettingsList title="Tracking">
      <SettingsRow label="Mode" hint={HINT[values.mode]} htmlFor="sMode">
        <select
          id="sMode"
          className="rin"
          value={values.mode}
          onChange={(event) =>
            onChange({
              mode: event.target.value === "ledger" ? "ledger" : "simple",
            })
          }
        >
          <option value="simple">Simple</option>
          <option value="ledger">Ledger</option>
        </select>
      </SettingsRow>
    </SettingsList>
  );
}
