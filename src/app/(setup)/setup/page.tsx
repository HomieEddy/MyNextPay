import { redirect } from "next/navigation";
import { SetupWizard } from "@/components/features/setup/setup-wizard";
import { blankProfile } from "@/lib/profile-input";
import { getDb } from "@/server/db/client";
import { findSettings } from "@/server/repos/settings-repo";
import { appToday } from "@/server/today";

export const dynamic = "force-dynamic";

export default function SetupPage() {
  if (findSettings(getDb())) redirect("/");
  return <SetupWizard initial={{ ...blankProfile(appToday()), bills: [] }} />;
}
