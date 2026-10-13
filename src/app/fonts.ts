// fonts.ts for the seed
//
// bin/stitch-brand-from-facts.mjs --css-out overwrites this file per client,
// from the style named by --style (or the onboarding record's `style` field,
// or "wavy" if neither names one). This copy is the seed's own default, built
// by hand from styles/wavy/style.json so the seed still builds with no client
// wired up.
//
// style: wavy
// display: Space Grotesk, body: Inter
//
// THE FACES ARE SELF-HOSTED, NOT FETCHED FROM GOOGLE AT BUILD TIME.
// next/font/google reads https://fonts.googleapis.com/css2 during the build
// and pulls a file extension off every url it finds, with no null guard:
//
//   next/dist/compiled/@next/font/dist/google/loader.js:122
//     const ext = /\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1]
//
// Google intermittently answers with the extensionless form
// (fonts.gstatic.com/l/font?kit=...), and that response fails the whole build
// with "An error occurred in `next/font`. TypeError: Cannot read properties of
// null (reading '1')". Measured at roughly 1 response in 50 on 2026-09-30, so
// it is a coin flip rather than a clean reproducible break. Self-hosting takes
// the build-time network call out of the picture, and it is also what
// bin/assert-local-assets asks of every other asset a client site ships.
//
// The woff2 files in ./fonts/ are the latin subset, vendored by
// bin/vendor-seed-fonts.mjs, which also records their provenance in
// ./fonts/fonts.json. Each variable file carries the family's whole weight
// range, so asking for three weights costs one request, not three.

import localFont from "next/font/local";

export const display = localFont({
  src: [{ path: "./fonts/space-grotesk-latin-var.woff2", style: "normal" }],
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const body = localFont({
  src: [{ path: "./fonts/inter-latin-var.woff2", style: "normal" }],
  weight: "100 900",
  variable: "--font-body-loaded",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
