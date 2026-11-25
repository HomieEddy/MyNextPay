"use client";

import { Toaster as Sonner } from "sonner";

/** Dark pill toasts at the top, as in the mockup. */
export function Toaster() {
  return (
    <Sonner
      position="top-center"
      offset={44}
      toastOptions={{
        unstyled: true,
        classNames: { toast: "np-toast", actionButton: "np-toast-act" },
      }}
    />
  );
}
