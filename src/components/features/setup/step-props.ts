import type { SetupInput } from "@/lib/schemas/setup";

export type StepProps = {
  values: SetupInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<SetupInput>) => void;
};
