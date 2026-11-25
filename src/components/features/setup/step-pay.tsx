import { PayFields } from "@/components/features/profile/pay-fields";
import type { SetupInput } from "@/lib/schemas/setup";

type Props = {
  values: SetupInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<SetupInput>) => void;
};

export function StepPay(props: Props) {
  return <PayFields {...props} />;
}
