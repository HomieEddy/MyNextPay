"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { removeRecurringItem } from "@/server/actions/recurring/remove-recurring-item";

export function RemoveButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      disabled={pending}
      className="text-red-ink"
      onClick={() =>
        startTransition(async () => {
          await removeRecurringItem(id);
          router.push("/recurring");
        })
      }
    >
      Delete
    </Button>
  );
}
