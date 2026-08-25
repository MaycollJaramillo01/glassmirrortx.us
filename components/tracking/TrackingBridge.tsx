"use client";

import { useEffect } from "react";
import { captureAttribution, trackEvent, type TrackingEventName } from "@/lib/tracking";

/**
 * One delegated click listener for the whole site.
 *
 * Every phone and email link carries `data-cta` and `data-location`, so button
 * components stay server-rendered instead of each becoming a client component
 * just to fire an event.
 */
export function TrackingBridge() {
  useEffect(() => {
    captureAttribution();

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cta]");
      if (!el) return;

      const cta = el.dataset.cta;
      if (!cta) return;

      const map: Record<string, TrackingEventName> = {
        phone: "phone_click",
        emergency_phone: "emergency_phone_click",
        email: "email_click",
      };

      const name = map[cta];
      if (!name) return;

      trackEvent({
        name,
        location: el.dataset.location ?? "unknown",
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
