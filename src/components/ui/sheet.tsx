"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

/** Bottom sheet opened by a URL. Closing it goes back to `closeHref`. */
export function Sheet({
  title,
  closeHref,
  children,
}: {
  title: string;
  closeHref: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const closeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push(closeHref, { scroll: false });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeHref, router]);

  return (
    <>
      <Link
        href={closeHref}
        scroll={false}
        className="scrim on"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div
        className="sheet on"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
      >
        <div className="grab" />
        <div className="sh">
          <h2 id="sheet-title">{title}</h2>
          <Link
            ref={closeRef}
            href={closeHref}
            scroll={false}
            className="icon-btn"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Link>
        </div>
        <div className="sb">{children}</div>
      </div>
    </>
  );
}
