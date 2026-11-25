"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { EntryFormInput } from "@/lib/schemas/entry";
import { logEntry } from "@/server/actions/entries/log-entry";
import { removeEntry } from "@/server/actions/entries/remove-entry";

/** Deletes the entry, then offers an Undo that logs it again. */
export function DeleteEntryButton({
  id,
  entry,
  closeHref,
}: {
  id: number;
  entry: EntryFormInput;
  closeHref: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const undo = () => logEntry({ ...entry, id: undefined });
  const remove = () =>
    startTransition(async () => {
      await removeEntry(id);
      router.push(closeHref, { scroll: false });
      toast("Entry deleted", { action: { label: "Undo", onClick: undo } });
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
