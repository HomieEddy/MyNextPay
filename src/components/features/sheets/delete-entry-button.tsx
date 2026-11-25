"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { removeEntry } from "@/server/actions/entries/remove-entry";

export function DeleteEntryButton({
  id,
  closeHref,
}: {
  id: number;
  closeHref: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const remove = () =>
    startTransition(async () => {
      await removeEntry(id);
      router.push(closeHref, { scroll: false });
    });
  return (
    <Button
      variant="ghost"
      className="danger"
      disabled={pending}
      onClick={remove}
    >
      Delete
    </Button>
  );
}
