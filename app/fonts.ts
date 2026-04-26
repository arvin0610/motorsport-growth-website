import localFont from "next/font/local";

/**
 * Self-hosted fonts via next/font/local — NOT Google's API.
 * Files live in node_modules from @fontsource (free OFL faces) and the geist package.
 *
 * To swap to PP Neue Machina / Söhne / Migra etc:
 *   1. Drop the .woff2 files in /public/fonts
 *   2. Replace the `path` strings below to point at "../public/fonts/..."
 *   3. Keep the variable names — the rest of the codebase reads var(--font-mg-*)
 */

export const display = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mg-display",
  display: "swap",
  preload: true,
});

export const body = localFont({
  src: [
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mg-body",
  display: "swap",
  preload: true,
});

export const editorial = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-mg-editorial",
  display: "swap",
});

export const mono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mg-mono",
  display: "swap",
});
