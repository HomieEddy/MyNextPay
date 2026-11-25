import { FloorFields } from "@/components/features/profile/floor-fields";
import type { SetupInput } from "@/lib/schemas/setup";
import { BillsEditor } from "./bills-editor";

type Props = {
  values: SetupInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<SetupInput>) => void;
};

export function StepBills({ values, errors, onChange }: Props) {
  return (
    <>
      <BillsEditor
        bills={values.bills}
        onChange={(bills) => onChange({ bills })}
      />
      <FloorFields values={values} errors={errors} onChange={onChange} />
    </>
  );
}
