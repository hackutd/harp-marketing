# Brand assets

Everything here is generated from `lib/logo-paths.ts` by
`node scripts/brand-assets.mts` (needs `google-chrome` and `ffmpeg`), so the
web preloader, the Lottie file and the video outros share one animation.

| File                         | Use                                                           |
| ---------------------------- | ------------------------------------------------------------- |
| `hackutd-logo.svg`           | Source wordmark (vector).                                     |
| `hackutd-logo-draw.json`     | Lottie, 2248x785, 60 fps, 2.6 s. Web/app embeds.              |
| `hackutd-logo-draw.webm`     | VP9 + alpha, 1080x1920, 30 fps, 3.5 s. Premiere/DaVinci/web.  |
| `hackutd-logo-draw-4444.mov` | ProRes 4444 + alpha, 1080x1920. Final Cut / After Effects.    |
| `hackutd-logo-draw.mp4`      | H.264 on the site background, 1080x1920. Drop-in Reels outro. |

Timing: glyphs stroke on left to right over 2 s, the fill fades in from
1.6–2.2 s, the stroke fades out by 2.4 s, then the clips hold the finished
logo.
