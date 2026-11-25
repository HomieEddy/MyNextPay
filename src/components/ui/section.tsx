import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 px-1 text-[13px] font-semibold tracking-wide text-mute uppercase">
        {title}
      </h2>
      <div className="overflow-hidden rounded-card bg-card">{children}</div>
    </section>
  );
}
