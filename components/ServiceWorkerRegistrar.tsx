"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let cancelled = false;

    async function registerServiceWorker() {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        if (!cancelled) {
          // Silent fallback: the app still works without the SW.
        }
      }
    }

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
