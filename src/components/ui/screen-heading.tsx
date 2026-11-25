import type { ReactNode } from "react";

export function ScreenHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="hd">
      <h1 className="vt">{title}</h1>
      {action}
    </div>
  );
}
