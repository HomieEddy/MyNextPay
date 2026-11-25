import type { ReactNode } from "react";

const TONES = {
  green: "bg-green-soft text-green",
  orange: "bg-orange-soft text-orange-ink",
  neutral: "bg-screen text-mute",
};

export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
