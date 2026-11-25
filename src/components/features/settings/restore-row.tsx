"use client";

import { useState, useTransition } from "react";
import { RowText } from "@/components/ui/row-text";
import type { ActionResult } from "@/lib/action-result";

/** A list row that picks a backup file and restores it right away. */
export function RestoreRow({
  onRestore,
}: {
  onRestore: (form: FormData) => Promise<ActionResult>;
}) {
  const [hint, setHint] = useState("Replaces what's here");
  const [pending, startTransition] = useTransition();
  const restore = (file: File) => {
    const form = new FormData();
    form.set("file", file);
    startTransition(async () => {
      const result = await onRestore(form);
      setHint(result.ok ? "Backup restored" : result.error);
    });
  };
  return (
    <label className="row rowbtn" aria-busy={pending}>
      <RowText title="Restore from a backup" hint={hint} />
      <input
        type="file"
        accept="application/json,.json"
        className="sr-only"
        disabled={pending}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) restore(file);
          event.target.value = "";
        }}
      />
    </label>
  );
}
