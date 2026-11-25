export function Switch({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <input
      id={id}
      type="checkbox"
      className="sw2"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}
