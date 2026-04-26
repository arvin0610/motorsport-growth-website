import Image from "next/image";
import { clients } from "@/lib/clients";

/**
 * Single-row client logo marquee. Constant 40s velocity, runs continuously
 * (does NOT pause on hover). Reduced motion = static (handled in globals.css).
 */
export function ClientMarquee() {
  // Duplicate the track for a seamless 50% loop.
  const items = [...clients, ...clients];

  return (
    <section
      aria-label="Trusted by"
      className="relative w-full bg-mg-black hairline-t hairline-b"
    >
      {/* Eyebrow + count — narrow strip, centered */}
      <div className="mx-auto flex w-full max-w-[920px] items-baseline justify-between gap-6 px-5 py-4 md:px-8">
        <p className="t-eyebrow">— IN THE GARAGE WITH</p>
        <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
          {clients.length} BRANDS · 120+ CAMPAIGNS
        </p>
      </div>

      <div className="marquee h-[180px] items-center md:h-[200px]">
        <div className="marquee-track marquee-track--ltr">
          {items.map((c, i) => (
            <span
              key={`${c.slug}-${i}`}
              aria-hidden={i >= clients.length || undefined}
              className="relative flex h-20 w-[260px] shrink-0 items-center justify-center md:h-24 md:w-[300px]"
            >
              <Image
                src={c.logo}
                alt={i < clients.length ? c.name : ""}
                width={300}
                height={96}
                className="h-full w-auto max-w-full object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
