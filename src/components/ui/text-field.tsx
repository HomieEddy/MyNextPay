import type { ComponentProps } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  name: string;
  error?: string;
};

export function TextField({ label, name, error, ...props }: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <label className="mb-3 block text-[13px] font-semibold text-mute">
      {label}
      <input
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="mt-1.5 block min-h-12 w-full rounded-[14px] border border-line bg-card px-3.5 text-base font-normal text-ink"
        {...props}
      />
      {error && (
        <span id={errorId} className="mt-1 block font-normal text-red-ink">
          {error}
        </span>
      )}
    </label>
  );
}
