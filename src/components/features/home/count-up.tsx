"use client";

import { useEffect, useState } from "react";
import { splitMoney } from "@/lib/split-money";

const DURATION_MS = 900;

/** Counts up to `cents` when it first shows or changes. Skipped under reduced motion. */
export function CountUp({ cents }: { cents: number }) {
  const [shown, setShown] = useState(cents);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(cents);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(cents * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cents]);

  const { whole, fraction } = splitMoney(shown);
  return (
    <>
      {whole}
      <small>{fraction}</small>
    </>
  );
}
