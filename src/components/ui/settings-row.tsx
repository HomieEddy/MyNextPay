import type { ReactNode } from "react";

/** One row of a grouped list: a label on the left, its control on the right. */
export function SettingsRow({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="row">
      <label className="t" htmlFor={htmlFor}>
        <b>{label}</b>
        {error ? (
          <span className="danger">{error}</span>
        ) : (
          hint && <span>{hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}
