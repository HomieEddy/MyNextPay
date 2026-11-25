export type Cents = number;

const AMOUNT_PATTERN = /^\d+(\.\d{1,2})?$/;

const formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

/** Turns user input like "1,234.50" or "$12" into cents. Returns null when invalid. */
export function parseAmount(text: string): Cents | null {
  const cleaned = text.replace(/[$,\s]/g, "");
  if (!AMOUNT_PATTERN.test(cleaned)) return null;
  return Math.round(Number(cleaned) * 100);
}

export function formatMoney(cents: Cents): string {
  return formatter.format(cents / 100);
}

export function sumCents(amounts: Cents[]): Cents {
  return amounts.reduce((total, amount) => total + amount, 0);
}
