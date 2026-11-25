import { ConfirmRow } from "@/components/ui/confirm-row";
import { RowText } from "@/components/ui/row-text";
import { SettingsList } from "@/components/ui/settings-list";
import type { ActionResult } from "@/lib/action-result";
import { RestoreRow } from "./restore-row";

/** The Data group in Settings: backup, restore, sample data, erase. */
export function DataRows({
  backupHref,
  onRestore,
  onSample,
  onErase,
}: {
  backupHref: string;
  onRestore: (form: FormData) => Promise<ActionResult>;
  onSample: () => Promise<void>;
  onErase: () => Promise<void>;
}) {
  return (
    <SettingsList title="Data">
      <a className="row rowbtn" href={backupHref} download>
        <RowText title="Download a backup" hint="Everything, as one file" />
      </a>
      <RestoreRow onRestore={onRestore} />
      <ConfirmRow
        title="Reload sample data"
        hint="Handy for trying things out"
        confirmHint="Tap again to replace your data with the sample"
        onConfirm={onSample}
      />
      <ConfirmRow
        title="Erase everything"
        hint="Start clean"
        confirmHint="Tap again to erase. This can't be undone"
        danger
        onConfirm={onErase}
      />
    </SettingsList>
  );
}
