import type { CSSProperties } from "react";

import { LOGO_ACCENT, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

/** Seconds from the first stroke starting to the last stroke finishing. */
export const LOGO_DRAW_SECONDS = 2;
/** Seconds until the fill is fully in and the stroke has faded out. */
export const LOGO_SETTLE_SECONDS = 2.6;

/**
 * The HackUTD wordmark drawing itself on: every glyph outline is stroked via
 * `stroke-dashoffset` with a left-to-right stagger, then the fill fades in and
 * the stroke fades away. Timing lives in `--logo-*` custom properties in
 * `globals.css`, and `prefers-reduced-motion` collapses it to a plain fade.
 *
 * Purely presentational — parents decide when to mount and unmount it.
 */
export function LogoDraw({
  className,
  title = "HackUTD",
}: {
  className?: string;
  title?: string;
}) {
  const last = LOGO_PATHS.length - 1;
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {LOGO_PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          transform={`translate(${p.x} ${p.y})`}
          pathLength={1}
          className="logo-draw-path"
          style={
            {
              "--logo-i": i / last,
              color: p.accent ? LOGO_ACCENT : undefined,
            } as CSSProperties
          }
        />
      ))}
    </svg>
  );
}
