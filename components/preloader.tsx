"use client";

import { useEffect, useState } from "react";

import { LogoDraw, LOGO_SETTLE_SECONDS } from "@/components/logo-draw";

const REDUCED_MOTION_HOLD_MS = 700;
/** Matches `.preloader` `transition` in globals.css. */
const FADE_MS = 400;

type Phase = "drawing" | "leaving" | "done";

/**
 * Full-screen overlay that plays the logo draw-on once, fades out, and
 * unmounts. Dismissal waits for the app to mount *and* for the draw cycle to
 * settle, so a fast load never flashes a half-drawn logo. Under
 * `prefers-reduced-motion` the CSS already skips the stroke, so we only hold
 * long enough for the static fade.
 *
 * The overlay is `position: fixed` and the page renders underneath it from the
 * start, so unmounting causes no layout shift; the logo is inline SVG, so the
 * only paint cost is the overlay itself.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("drawing");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hold = reduced ? REDUCED_MOTION_HOLD_MS : LOGO_SETTLE_SECONDS * 1000;
    const leave = window.setTimeout(() => setPhase("leaving"), hold);
    const done = window.setTimeout(() => setPhase("done"), hold + FADE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="preloader"
      role="status"
      aria-live="polite"
      aria-busy={phase === "drawing"}
      data-leaving={phase === "leaving" ? "" : undefined}
    >
      <LogoDraw className="w-[min(60vw,32rem)]" />
    </div>
  );
}
