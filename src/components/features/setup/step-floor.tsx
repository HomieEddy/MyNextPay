import { SettingsRow } from "@/components/ui/settings-row";
import { Switch } from "@/components/ui/switch";
import { formatMoney, parseAmount } from "@/domain/money";
import type { StepProps } from "./step-props";

export function StepFloor({ values, errors, onChange }: StepProps) {
  const cents = parseAmount(values.floor) ?? 0;
  return (
    <>
      <div className="flbig num">{formatMoney(cents).replace(/\.00$/, "")}</div>
      <input
        className="range"
        type="range"
        aria-label="Floor amount"
        min={0}
        max={1500}
        step={50}
        value={Math.round(cents / 100)}
        onChange={(e) => onChange({ floor: `${e.target.value}.00` })}
      />
      <div className="rlbl">
        <span>$0</span>
        <span>$1,500</span>
      </div>
      {errors.floor && <p className="err">{errors.floor}</p>}
      <div className="list">
        <SettingsRow
          label="Low-balance warning"
          hint="Show a banner when you dip below"
          htmlFor="oWarn"
        >
          <Switch
            id="oWarn"
            checked={values.lowBalanceWarning}
            onChange={(lowBalanceWarning) => onChange({ lowBalanceWarning })}
          />
        </SettingsRow>
      </div>
    </>
  );
}
