/** The big centred dollar input from onboarding. */
export function AmountInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="amt num" htmlFor={id}>
      $
      <input
        id={id}
        inputMode="decimal"
        placeholder="0.00"
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
