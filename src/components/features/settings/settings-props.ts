import type { ProfileInput } from "@/lib/schemas/profile";

export type SettingsGroupProps = {
  values: ProfileInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<ProfileInput>) => void;
};
