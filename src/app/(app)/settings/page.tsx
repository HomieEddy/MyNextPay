import { redirect } from "next/navigation";
import { LogOutButton } from "@/components/features/auth/log-out-button";
import { DataRows } from "@/components/features/settings/data-rows";
import { SettingsForm } from "@/components/features/settings/settings-form";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { SettingsList } from "@/components/ui/settings-list";
import { toProfileInput } from "@/lib/profile-input";
import { logOut } from "@/server/actions/auth/log-out";
import { eraseData } from "@/server/actions/data/erase-data";
import { reloadSample } from "@/server/actions/data/reload-sample";
import { restoreBackup } from "@/server/actions/data/restore-backup";
import { getDb } from "@/server/db/client";
import { findSettings } from "@/server/repos/settings-repo";
import { findUser } from "@/server/repos/user-repo";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const db = getDb();
  const settings = findSettings(db);
  if (!settings) redirect("/setup");

  return (
    <>
      <ScreenHeading title="Settings" />
      <SettingsForm
        initial={toProfileInput(settings, findUser(db)?.name ?? "")}
      />
      <DataRows
        backupHref="/api/backup"
        onRestore={restoreBackup}
        onSample={reloadSample}
        onErase={eraseData}
      />
      <SettingsList title="Account">
        <LogOutButton action={logOut} />
      </SettingsList>
    </>
  );
}
