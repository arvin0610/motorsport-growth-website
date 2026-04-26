"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

/**
 * Section 03 / WORK — full-viewport scroll-driven reel.
 *
 * Each case study is a 100svh block. Image scales 1.05 → 1.0 across its
 * scroll progress. Pinned-overlay carries client name, strategy summary,
 * three mono stat lines, and a "Read case" link.
 */
export function WorkReel() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative w-full bg-mg-black"
    >
      <div className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">03 / WORK</p>
          <h2 className="t-display t-display-lg mt-6 max-w-[20ch] text-mg-white">
            Programs we&apos;ve operated end-to-end<span className="text-mg-red">.</span>
          </h2>
          <p className="t-body mt-8 max-w-[58ch] text-mg-bone">
            Short list, on purpose. Numbers attached, on purpose.
          </p>
        </div>
      </div>

      {caseStudies.map((c, i) => (
        <Block key={c.slug} study={c} index={i + 1} />
      ))}

      <div className="px-5 py-20 md:px-8">
        <div className="mx-auto flex max-w-[1640px] items-center justify-between hairline-t pt-10">
          <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
            ARCHIVE / {caseStudies.length} ENTRIES
          </p>
          <Link href="/work" className="cta-text" data-cursor="OPEN">
            See all work <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Block({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);

  return (
    <article
      ref={ref}
      className="relative w-full overflow-hidden hairline-t"
      style={{ height: "100svh", minHeight: 560 }}
    >
      {/* Full-bleed image — only motion is the scale 1.05→1.0 (no translate) */}
      <motion.div className="absolute inset-0 img-plate" style={{ scale }}>
        <Image
          src={study.hero}
          alt=""
          fill
          quality={88}
          sizes="100vw"
          className="object-cover"
        />
        {/* Flat dark scrim (NOT a gradient) — improves AA contrast on the overlay */}
        <div aria-hidden className="absolute inset-0 bg-mg-black/45" />
      </motion.div>

      {/* Pinned overlay — left side */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1640px] grid-cols-12 gap-x-5 px-5 py-10 md:px-8">
        <div className="col-span-12 flex flex-col justify-between md:col-span-7">
          <div className="flex items-center gap-4">
            <span className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-bone">
              CASE / {String(index).padStart(2, "0")}
            </span>
            <span className="hr-mg w-12" />
            <span className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-bone">
              {study.year}
            </span>
          </div>

          <div>
            <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-bone">
              {study.client}
            </p>
            <h3 className="t-display mt-3 max-w-[22ch] text-mg-white" style={{ fontSize: "clamp(40px, 6.5vw, 92px)" }}>
              {study.title}
            </h3>
            <p className="t-body mt-5 max-w-[52ch] text-mg-bone">{study.excerpt}</p>

            <ul className="t-mono mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-mg-white">
              {study.stats.slice(0, 3).map((s) => (
                <li key={s.label} className="inline-flex items-baseline gap-2">
                  <span className="text-mg-red">{s.value}</span>
                  <span className="text-mg-ash">{s.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link href={`/work/${study.slug}`} className="cta-text" data-cursor="READ">
                Read case <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
