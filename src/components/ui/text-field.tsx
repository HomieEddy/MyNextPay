import type { ComponentProps } from "react";

type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  name: string;
  error?: string;
};

export function TextField({ label, name, error, ...props }: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <label className="field">
      {label}
      <input
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className="err block">
          {error}
        </span>
      )}
    </label>
  );
}
