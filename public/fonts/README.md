# /public/fonts — licensed font drop-in

The site ships with self-hosted free faces (Bebas Neue, Geist Sans, Instrument Serif, JetBrains Mono) loaded from `@fontsource` packages and the `geist` package, both pulled in by `next/font/local` from `node_modules`.

To swap in the licensed faces specified in the brief (PP Neue Machina, Söhne, GT America, Migra, etc.):

1. Drop the `.woff2` files into this folder.
   ```
   public/fonts/
     PPNeueMachina-Ultrabold.woff2
     PPNeueMachina-Regular.woff2
     Soehne-Buch.woff2
     Soehne-Halbfett.woff2
     PPEditorialNew-Italic.woff2
     ...
   ```
2. Open [`app/fonts.ts`](../../app/fonts.ts).
3. Replace the `localFont({ src: ... })` paths that point into `node_modules/@fontsource/...` with the path to your file in this folder, e.g.
   ```ts
   src: [{ path: "../public/fonts/PPNeueMachina-Ultrabold.woff2", weight: "800", style: "normal" }],
   ```
4. Keep the `variable` name the same (`--font-display`, `--font-body`, etc.) so the rest of the codebase doesn't have to change.

That's it. No CSS edits required.
