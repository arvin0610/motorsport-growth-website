import Link from "next/link";
import { Counter } from "./counter";

const paragraphs = [
  {
    drop: "[ ORIGIN ]",
    body:
      "Started in a garage in Agoura Hills in 2021, run by operators who'd spent the previous decade inside performance brands — not pitching them. We've launched product lines, valeted at concours, run Formula Drift programs, fought Turn14 feeds, and shipped Shopify rebuilds at 2 AM the night before SEMA opens.",
  },
  {
    drop: "[ APPROACH ]",
    body:
      "Every client runs like a race program. Build sheet, sector-by-sector plan, telemetry readout, debrief after every session. Paid media, e-commerce, and brand operate as one car — not three vendors handing off Slack threads. We launch fast, measure faster, and tune the program every Monday until the numbers move.",
  },
  {
    drop: "[ EDGE ]",
    body:
      "We're the only studio that ships a Turn14-grade Shopify build, a paddock-grade brand, and a Triple-Whale-grade media program from one team. No translation tax between the photo crew, the dev shop, and the media buyer. One war room. One build sheet. One number that matters at quarter-end.",
  },
];

export function Who() {
  return (
    <section
      id="who"
      aria-label="Who we are"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <p className="t-eyebrow">01 / WHO</p>

        <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-12">
          {/* Sticky stat — 5 cols */}
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-32">
              <span
                aria-hidden
                className="t-display block text-mg-white"
                style={{
                  fontSize: "clamp(120px, 18vw, 320px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                }}
              >
                <span className="text-mg-red">+</span>
                <Counter to={312} suffix="%" />
              </span>
              <p className="t-mono mt-6 max-w-[44ch] text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                YOY REVENUE — DESTINED INDUSTRIES, FY2025 · 4.2× BLENDED ROAS
              </p>
            </div>
          </div>

          {/* Dense paragraphs — 7 cols */}
          <div className="col-span-12 md:col-span-7">
            <h2 className="t-display t-display-md text-mg-white">
              We grew up in the paddock<span className="text-mg-red">.</span>
            </h2>

            <div className="mt-10 space-y-10">
              {paragraphs.map((p) => (
                <div key={p.drop} className="hairline-t pt-8">
                  <span className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                    {p.drop}
                  </span>
                  <p className="t-body mt-3 max-w-[58ch] text-mg-bone">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <Link href="/about" className="cta-text" data-cursor="OPEN">
                More about the team <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
