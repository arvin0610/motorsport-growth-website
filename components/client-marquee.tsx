import Image from "next/image";
import { clients } from "@/lib/clients";

/**
 * Single-row client logo marquee. Constant 40s velocity, runs continuously
 * (does NOT pause on hover). Reduced motion = static (handled in globals.css).
 *
 * Section sits on a darkened McLaren textural bg image (8:1 wide letterbox).
 * Logos rendered monochrome white via filter; eyebrow + count type also white.
 */
export function ClientMarquee() {
  const items = [...clients, ...clients];

  return (
    <section
      aria-label="Trusted by"
      className="relative w-full overflow-hidden bg-mg-black hairline-t hairline-b"
    >
      {/* Full-bleed textural background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/assets/clients-strip-bg.jpg"
          alt=""
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Eyebrow + count — narrow strip, centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] items-baseline justify-between gap-6 px-5 py-4 md:px-8">
        <p className="t-eyebrow !text-mg-white">— IN THE GARAGE WITH</p>
        <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-white">
          40+ BRANDS · $24M+ PIPELINE
        </p>
      </div>

      <div className="relative z-10 marquee h-[180px] items-center md:h-[200px]">
        <div className="marquee-track marquee-track--ltr">
          {items.map((c, i) => (
            <Image
              key={`${c.slug}-${i}`}
              src={c.logo}
              alt={i < clients.length ? c.name : ""}
              aria-hidden={i >= clients.length || undefined}
              width={400}
              height={300}
              className="h-24 w-auto shrink-0 md:h-28"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
