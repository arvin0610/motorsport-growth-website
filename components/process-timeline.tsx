"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { easeMg } from "@/lib/motion";

interface Stage {
  index: string;
  name: string;
  body: string;
  ticker: string;
}

const stages: Stage[] = [
  {
    index: "01",
    name: "Diagnose",
    body:
      "Two-week teardown. Every line of ad spend, every Klaviyo flow, every PDP, every shoot file. One document: where you're losing money, where you're leaving money, what we ship in the first 60 days.",
    ticker: "TIMELINE: 2 WEEKS",
  },
  {
    index: "02",
    name: "Tune",
    body:
      "Build the car before we race it. Tracking gets fixed (CAPI, GA4, server-side). The Shopify build gets the bolts torqued. Klaviyo gets rebuilt to spec. No new spend until the platform won't fail under load.",
    ticker: "SPRINTS: TWO-WEEK",
  },
  {
    index: "03",
    name: "Launch",
    body:
      "Lights out. The first program goes live with a target, a budget, and a creative bank deep enough to last the quarter. Most clients are in-market within 21 days of kickoff.",
    ticker: "GO-LIVE: ≤ DAY 21",
  },
  {
    index: "04",
    name: "Measure",
    body:
      "Telemetry, not vanity. One dashboard, one blended-MER number. Daily for the first 30 days, weekly after. Every Monday: a 30-min debrief on what moved, what didn't, the three things we change this week.",
    ticker: "READOUT: WEEKLY",
  },
  {
    index: "05",
    name: "Iterate",
    body:
      "Tune the program every week, retune the strategy every quarter. Creative on a 30-day refresh cadence. Annual planning timed to SEMA, FD season, and Q4 retail. The program never sits still because the season doesn't.",
    ticker: "CADENCE: ALWAYS",
  },
];

/**
 * Section 04 / PROCESS — horizontal scroll timeline (desktop) /
 * vertical stack (mobile). Five stages connected by red SVG arrows
 * that draw in sequence as the row enters the viewport.
 *
 * No GSAP scroll-pin here — the brief allows it but a normal
 * horizontally-overflowed flex with snap is faster, cleaner, and
 * more accessible. On mobile we fall back to a vertical stack.
 */
export function ProcessTimeline() {
  return (
    <section
      id="process"
      aria-label="Our process"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="t-eyebrow">04 / PROCESS</p>
            <h2 className="t-display t-display-lg mt-6 max-w-[16ch] text-mg-white">
              From dyno to delivery.
            </h2>
          </div>
          <p className="t-mono hidden max-w-[40ch] text-[11px] uppercase tracking-[0.22em] text-mg-ash md:block">
            FIVE STAGES · 18 WEEKS TO RETAINER · NO DECK-WARE
          </p>
        </div>

        {/* Desktop: horizontal scroll, snap, custom scrollbar via .scrollbar-thin */}
        <div className="mt-16 hidden md:block">
          <ol className="grid grid-cols-5 gap-0">
            {stages.map((s, i) => (
              <Stage key={s.index} stage={s} isLast={i === stages.length - 1} />
            ))}
          </ol>
        </div>

        {/* Mobile: vertical stack */}
        <ol className="mt-12 space-y-10 md:hidden">
          {stages.map((s, i) => (
            <li key={s.index} className="hairline-t pt-6">
              <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                {s.index} / 05
              </p>
              <h3 className="t-display t-display-md mt-3 text-mg-white">{s.name}</h3>
              <p className="t-body mt-4 text-mg-bone">{s.body}</p>
              <p className="t-mono mt-4 text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                {s.ticker}
              </p>
              {i < stages.length - 1 && (
                <p className="t-mono mt-6 text-[12px] tracking-[0.22em] text-mg-red">↓</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stage({ stage, isLast }: { stage: Stage; isLast: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <li ref={ref} className="relative hairline-t pt-6 pr-6">
      <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
        {stage.index} / 05
      </p>
      <h3 className="t-display mt-4 text-mg-white" style={{ fontSize: "clamp(28px, 2.8vw, 44px)" }}>
        {stage.name}
      </h3>
      <p className="t-body mt-5 max-w-[28ch] text-mg-bone">{stage.body}</p>
      <p className="t-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-mg-ash">
        {stage.ticker}
      </p>

      {/* Red SVG arrow connecting to the next stage */}
      {!isLast && (
        <svg
          aria-hidden
          width="36"
          height="14"
          viewBox="0 0 36 14"
          fill="none"
          className="absolute right-[-8px] top-[34px]"
        >
          <motion.path
            d="M 1 7 L 30 7 M 24 1 L 35 7 L 24 13"
            stroke="var(--color-mg-red)"
            strokeWidth="1.4"
            strokeLinecap="square"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 0.5, ease: easeMg }}
          />
        </svg>
      )}
    </li>
  );
}
