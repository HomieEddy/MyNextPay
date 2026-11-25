"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { formatMoney } from "@/domain/money";

const CAD = { style: "currency", currency: "CAD" } as const;

/** Rolls the digits to `cents` when it first shows or changes. Still under reduced motion. */
export function MoneyFlow({ cents }: { cents: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => setShown(cents), [cents]);
  return (
    <>
      <span className="sr-only">{formatMoney(cents)}</span>
      <NumberFlow
        aria-hidden="true"
        value={shown / 100}
        locales="en-CA"
        format={CAD}
      />
    </>
  );
}
