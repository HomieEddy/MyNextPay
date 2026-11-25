import { Segmented } from "@/components/ui/segmented";
import { TextField } from "@/components/ui/text-field";
import type { RecurringInput } from "@/lib/schemas/recurring";

const WEEKDAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

type Props = {
  values: RecurringInput;
  errors: Record<string, string>;
  onChange: (patch: Partial<RecurringInput>) => void;
};

export function RecurringScheduleFields({ values, errors, onChange }: Props) {
  return (
    <>
      <Segmented
        label="Repeats"
        value={values.scheduleKind}
        onChange={(scheduleKind) => onChange({ scheduleKind })}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "weekly", label: "Weekly" },
          { value: "interval", label: "Every N days" },
        ]}
      />
      {values.scheduleKind === "monthly" && (
        <TextField
          label="Day of the month (1 to 31)"
          name="dayOfMonth"
          type="number"
          inputMode="numeric"
          min={1}
          max={31}
          value={values.dayOfMonth}
          onChange={(event) =>
            onChange({ dayOfMonth: Number(event.target.value) })
          }
          error={errors.dayOfMonth}
        />
      )}
      {values.scheduleKind === "weekly" && (
        <>
          <Segmented
            label="Day of the week"
            value={String(values.weekday)}
            onChange={(day) => onChange({ weekday: Number(day) })}
            options={WEEKDAYS.map((day) => ({
              value: String(day.value),
              label: day.label,
            }))}
          />
          <Segmented
            label="Every how many weeks"
            value={String(values.everyWeeks)}
            onChange={(weeks) => onChange({ everyWeeks: Number(weeks) })}
            options={[1, 2, 3, 4].map((weeks) => ({
              value: String(weeks),
              label: weeks === 1 ? "Every week" : `Every ${weeks}`,
            }))}
          />
        </>
      )}
      {values.scheduleKind === "interval" && (
        <TextField
          label="Every how many days"
          name="everyDays"
          type="number"
          inputMode="numeric"
          min={1}
          max={366}
          value={values.everyDays}
          onChange={(event) =>
            onChange({ everyDays: Number(event.target.value) })
          }
          error={errors.everyDays}
        />
      )}
      <TextField
        label="First date"
        name="startDate"
        type="date"
        value={values.startDate}
        onChange={(event) => onChange({ startDate: event.target.value })}
        error={errors.startDate}
      />
    </>
  );
}
