import type { ReactNode } from "react";

/** iOS-style grouped list: a small caption over a white rounded card. */
export function SettingsList({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="grp">{title}</div>
      <div className="list">{children}</div>
    </>
  );
}
