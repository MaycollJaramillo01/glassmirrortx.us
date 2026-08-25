"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The only JavaScript behind the whole reveal system: one IntersectionObserver
 * that adds `.is-in` to elements carrying `data-reveal`. Everything else is CSS.
 *
 * Adding `js-reveal` to <html> here (rather than in the server markup) is what
 * makes the system fail safe: without this component the CSS never hides
 * anything, so all content renders normally.
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Honour the OS setting rather than animating and immediately undoing it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Some embedded browsers do not expose IntersectionObserver. Keep the
    // content visible in that case instead of enabling a hidden state with no
    // way to reveal it.
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const targets = document.querySelectorAll("[data-reveal]");
    for (const target of targets) {
      // Anything already on screen at load reveals immediately, so the first
      // viewport is never blank while waiting for a scroll event.
      const box = target.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        target.classList.add("is-in");
      } else {
        observer.observe(target);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
