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
 * 45 / 55 asymmetric split (desktop):
 *   - Left  (45%)  : Massive headline + subhead + CTAs, ragged-right
 *   - Right (55%)  : Cropped car image, bleeds off the right edge of the viewport
 *
 * The word "race" is underlined with a hand-drawn SVG stroke in red.
 * No gradient over the image. No glow. No fade-up.
 */
export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-mg-black"
    >
      {/* Image bleeds the right 55% */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full md:w-[58%] lg:w-[55%]">
        <div className="img-plate relative h-full w-full">
          <Image
            src="/assets/hero/hero-primary.jpg"
            alt="Motorsport Growth — performance marketing for the paddock"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-[60%_50%]"
          />
          {/* Optional bleed dim — flat, not gradient. 12% black scrim only on mobile. */}
          <div className="absolute inset-0 bg-mg-black/40 md:bg-transparent" aria-hidden />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1640px] grid-cols-12 gap-x-5 px-5 pb-28 pt-32 md:px-8 md:pt-40">
        {/* Top section index */}
        <div className="col-span-12 -mt-6 md:col-span-6">
          <p className="t-eyebrow">00 / HERO</p>
        </div>

        {/* Left column — headline + subhead + CTAs */}
        <div className="col-span-12 mt-12 md:col-span-7 md:col-start-1">
          <h1 className="t-display text-mg-white">
            <ClipLine delay={0.1}>We don&apos;t run ads.</ClipLine>
            <ClipLine delay={0.22}>
              We run{" "}
              <span className="relative inline-block">
                <span>race</span>
                <RaceUnderline />
              </span>{" "}
              <span className="t-editorial italic text-mg-white">programs</span>
            </ClipLine>
            <ClipLine delay={0.34}>for performance brands.</ClipLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: easeMg }}
            className="t-body mt-12 max-w-[56ch] text-mg-bone"
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
            <Link href="/work" className="btn-secondary" data-cursor="OPEN">
              See the Work <span className="arrow">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero metadata strip */}
      <div className="relative z-10 hairline-t hairline-b">
        <div className="mx-auto flex w-full max-w-[1640px] flex-wrap items-center justify-between gap-y-3 gap-x-6 px-5 py-3 md:px-8">
          <span className="t-mono text-[11px] uppercase tracking-[0.2em] text-mg-ash">
            EST. 2021
          </span>
          <span className="t-mono text-[11px] uppercase tracking-[0.2em] text-mg-ash">
            AGOURA HILLS / GLOBAL
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-ash">
            <LiveClock />
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-ash">
            <CloudFog size={12} strokeWidth={1.5} aria-hidden />
            18°C
          </span>
          <span className="t-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-mg-ash">
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

/** Hand-drawn-feeling underline beneath the word "race" — animates on mount. */
function RaceUnderline() {
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
        transition={{ duration: 0.9, delay: 0.55, ease: easeMg }}
      />
    </svg>
  );
}
