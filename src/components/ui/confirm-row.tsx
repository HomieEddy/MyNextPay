"use client";

import { useState, useTransition } from "react";
import { RowText } from "./row-text";

/** A list row for a step that replaces data. The first tap asks, the second runs it. */
export function ConfirmRow({
  title,
  hint,
  confirmHint,
  danger = false,
  onConfirm,
}: {
  title: string;
  hint: string;
  confirmHint: string;
  danger?: boolean;
  onConfirm: () => Promise<void>;
}) {
  const [asking, setAsking] = useState(false);
  const [pending, startTransition] = useTransition();
  const tap = () => {
    if (!asking) return setAsking(true);
    startTransition(async () => {
      await onConfirm();
      setAsking(false);
    });
  };
  return (
    <button
      type="button"
      className="row rowbtn"
      disabled={pending}
      onClick={tap}
      onBlur={() => setAsking(false)}
    >
      <RowText
        title={title}
        hint={asking ? confirmHint : hint}
        danger={danger}
      />
    </button>
  );
}
