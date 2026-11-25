"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Drawer } from "vaul";

/** Bottom sheet opened by a URL. Swipe down, Escape, the scrim or Close go back to `closeHref`. */
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
  const [open, setOpen] = useState(true);
  const leave = () => router.push(closeHref, { scroll: false });

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      onAnimationEnd={(isOpen) => !isOpen && leave()}
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="scrim on" />
        <Drawer.Content className="sheet vd" aria-describedby={undefined}>
          <div className="grab" />
          <div className="sh">
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Close className="icon-btn" aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </Drawer.Close>
          </div>
          <div className="sb">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
