"use client";

import { useEffect, useRef } from "react";

/** Decorative hero motion that respects the visitor's reduced-motion setting. */
export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => {
        // The poster remains visible if a browser blocks decorative autoplay.
      });
    };

    syncPlayback();
    motionPreference.addEventListener("change", syncPlayback);
    return () => motionPreference.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video absolute inset-0 size-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/showers/shower-enclosure-1.webp"
      aria-hidden="true"
      tabIndex={-1}
    >
      {/* Mixkit 101377 — commercial use permitted under the Mixkit Free License. */}
      <source src="/videos/glass-reflections-hero.mp4" type="video/mp4" />
    </video>
  );
}
