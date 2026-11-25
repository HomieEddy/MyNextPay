"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { markAllPaid } from "@/server/actions/bills/mark-all-paid";

type Occurrence = { itemId: number; dueDate: string };

/** Marks every unpaid bill in the list paid. Hidden when nothing is left. */
export function MarkAllPaidButton({ unpaid }: { unpaid: Occurrence[] }) {
  const [pending, startTransition] = useTransition();
  if (unpaid.length === 0) return null;
  return (
    <Button
      disabled={pending}
      onClick={() =>
        startTransition(() =>
          markAllPaid(unpaid).then(() => {
            toast("All bills marked paid");
          }),
        )
      }
    >
      Mark all paid
    </Button>
  );
}
