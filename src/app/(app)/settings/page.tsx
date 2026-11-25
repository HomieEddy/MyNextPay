import { redirect } from "next/navigation";
import { LogOutButton } from "@/components/features/auth/log-out-button";
import { SettingsForm } from "@/components/features/settings/settings-form";
import { ScreenHeading } from "@/components/ui/screen-heading";
import { toProfileInput } from "@/lib/profile-input";
import { logOut } from "@/server/actions/auth/log-out";
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
      <div className="mt-8">
        <LogOutButton action={logOut} />
      </div>
    </>
  );
}
