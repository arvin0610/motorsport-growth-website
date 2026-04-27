"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CloudFog, ArrowDown } from "lucide-react";
import { LiveClock } from "./live-clock";
import { easeMg } from "@/lib/motion";

/**
 * Hero — "The Pit Wall"
 *
 * Full-bleed background image across the whole section, dimmed by a flat
 * dark scrim (NOT a gradient — brief rule). Headline + subhead + CTAs sit
 * on top, anchored to the left ~60% of the grid.
 *
 * The word "race" is underlined with a hand-drawn SVG stroke in red.
 */
export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-mg-black"
    >
      {/* Full-bleed background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/assets/hero/hero-primary.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[60%_55%]"
        />
        {/* Flat dark scrim — solid, not gradient. Brings white text to AAA contrast. */}
        <div className="absolute inset-0 bg-mg-black/55" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1640px] grid-cols-12 gap-x-5 px-5 pb-28 pt-32 md:px-8 md:pt-40">
        {/* Top section index */}
        <div className="col-span-12 -mt-6 md:col-span-6">
          <p className="t-eyebrow !text-mg-bone">00 / HERO</p>
        </div>

        {/* Left column — one-line headline + subhead + CTAs */}
        <div className="col-span-12 mt-12 md:col-start-1">
          <h1
            className="t-display text-mg-white"
            style={{
              fontSize: "clamp(56px, 11vw, 168px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            <ClipLine delay={0.12}>We&apos;re the team</ClipLine>
            <ClipLine delay={0.26}>
              behind the{" "}
              <span className="relative inline-block">
                <span className="t-editorial italic text-mg-white">team.</span>
                <RedUnderline delay={0.95} />
              </span>
            </ClipLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easeMg }}
            className="t-body mt-12 max-w-[56ch] font-medium text-mg-white"
          >
            Paid media, e-commerce, and brand — engineered by operators who&apos;ve shipped $24M+ in pipeline for 40+ motorsport, aftermarket, and exotic clients out of Agoura Hills, California.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85, ease: easeMg }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Link href="/contact" className="btn-primary" data-cursor="START">
              Start a Project <span className="arrow">→</span>
            </Link>
            <Link href="/work" className="cta-text" data-cursor="OPEN">
              See the Work <span className="arrow">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero metadata strip — solid black bg so hairlines + mono read cleanly over the image */}
      <div className="relative z-10 bg-mg-black hairline-t hairline-b">
        <div className="mx-auto flex w-full max-w-[1640px] flex-wrap items-center justify-between gap-y-3 gap-x-6 px-5 py-3 md:px-8">
          <span className="t-mono text-[11px] uppercase tracking-[0.2em] text-mg-bone">
            EST. 2021
          </span>
          <span className="t-mono text-[11px] uppercase tracking-[0.2em] text-mg-bone">
            AGOURA HILLS / GLOBAL
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-bone">
            <LiveClock />
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-bone">
            <CloudFog size={12} strokeWidth={1.5} aria-hidden />
            18°C
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-bone">
            SCROLL{" "}
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              aria-hidden
              className="inline-flex"
            >
              <ArrowDown size={12} strokeWidth={1.5} />
            </motion.span>
          </span>
        </div>
      </div>
    </section>
  );
}

/** Single line of headline, wiped left → right. */
function ClipLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.7, delay, ease: easeMg }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Hand-drawn-feeling red underline — animates on mount. Reused under
 *  any word in the headline that should carry the brand accent. */
function RedUnderline({ delay = 0.55 }: { delay?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 18"
      preserveAspectRatio="none"
      className="absolute -bottom-[6px] left-[-4%] h-[0.18em] w-[108%]"
    >
      <motion.path
        d="M 4 12 C 60 4, 110 16, 170 8 S 230 12, 236 6"
        fill="none"
        stroke="var(--color-mg-red)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: easeMg }}
      />
    </svg>
  );
}
