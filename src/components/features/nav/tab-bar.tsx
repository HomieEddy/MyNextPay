"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/recurring", label: "Recurring" },
  { href: "/settings", label: "Settings" },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-card/90 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-md justify-around px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 min-w-16 items-center justify-center rounded-xl px-3 text-sm font-semibold ${
                  active ? "text-green" : "text-mute"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
