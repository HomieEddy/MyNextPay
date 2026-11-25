"use client";

import { useEffect } from "react";

/** Registers the service worker that makes NextPay installable. Production only. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js");
  }, []);
  return null;
}
