import Image from "next/image";
import { clients } from "@/lib/clients";

/**
 * Dual-row client logo marquee.
 * Top row scrolls left (LTR), bottom row scrolls right (RTL).
 * Constant 40s velocity, paused on hover. Reduced motion = static grid.
 */
export function ClientMarquee() {
  // Split into two rows for variety
  const rowA = clients;
  const rowB = [...clients].reverse();

  return (
    <section
      aria-label="Trusted by"
      className="relative w-full bg-mg-black hairline-t hairline-b"
    >
      {/* Eyebrow + count */}
      <div className="mx-auto flex w-full max-w-[1640px] items-baseline justify-between px-5 py-4 md:px-8">
        <p className="t-eyebrow">— IN THE GARAGE WITH</p>
        <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
          {clients.length} BRANDS · 120+ CAMPAIGNS
        </p>
      </div>

      <Row tracks={rowA} dir="ltr" />
      <div className="hr-mg" />
      <Row tracks={rowB} dir="rtl" />

      {/* Reduced-motion fallback: static grid (only visible when marquee is off via CSS) */}
      <div className="hidden print:flex" aria-hidden>
        {/* Hidden by default, exposed when reduced motion is on via CSS in globals */}
      </div>
    </section>
  );
}

function Row({ tracks, dir }: { tracks: typeof clients; dir: "ltr" | "rtl" }) {
  // Duplicate the track for seamless loop — animation translates by -50%.
  const items = [...tracks, ...tracks];

  return (
    <div className="marquee h-[120px] items-center">
      <div
        className={
          dir === "ltr"
            ? "marquee-track marquee-track--ltr"
            : "marquee-track marquee-track--rtl"
        }
      >
        {items.map((c, i) => (
          <span
            key={`${c.slug}-${i}`}
            aria-hidden={i >= tracks.length || undefined}
            className="relative flex h-12 w-[180px] shrink-0 items-center justify-center"
          >
            <Image
              src={c.logo}
              alt={i < tracks.length ? c.name : ""}
              width={180}
              height={48}
              className="h-12 w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
