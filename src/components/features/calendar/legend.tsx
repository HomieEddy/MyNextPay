const ITEMS = [
  { label: "Payday or income", color: "var(--color-green)" },
  { label: "Bill due", color: "var(--color-orange)" },
  { label: "Paid", color: "var(--color-line)" },
  { label: "This cycle", color: "var(--color-green-soft)" },
];

export function Legend() {
  return (
    <div className="legend">
      {ITEMS.map((item) => (
        <span key={item.label}>
          <i style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
