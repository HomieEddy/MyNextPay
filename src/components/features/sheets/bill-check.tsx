"use client";

import { useOptimistic, useTransition } from "react";
import { setBillPaid } from "@/server/actions/bills/set-bill-paid";

/** The round tick that marks one bill occurrence paid or unpaid. */
export function BillCheck({
  itemId,
  dueDate,
  name,
  paid,
  children,
}: {
  itemId: number;
  dueDate: string;
  name: string;
  paid: boolean;
  children: React.ReactNode;
}) {
  const [shown, setShown] = useOptimistic(paid);
  const [, startTransition] = useTransition();
  const toggle = () =>
    startTransition(async () => {
      setShown(!shown);
      await setBillPaid({ itemId, dueDate, paid: !shown });
    });

  return (
    <div className={`row ${shown ? "paid" : ""}`}>
      <button
        type="button"
        className="chk"
        aria-label={shown ? `Mark ${name} unpaid` : `Mark ${name} paid`}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12l5 5 9-10" />
        </svg>
      </button>
      {children}
    </div>
  );
}
