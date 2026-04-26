"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { easeMg, easeMgOut } from "@/lib/motion";

/**
 * Section 02 / WHAT WE DO — accordion-table, NOT a card grid.
 * Five tall (88px) hairline-separated rows. Hover: 2px red bar slides
 * in at the row's left edge, label tracking expands subtly, image preview
 * slides in from the right. Click: row expands to a detailed panel below.
 */
export function ServicesIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(services[0].slug);

  return (
    <section
      id="services"
      aria-label="What we do"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <p className="t-eyebrow">02 / WHAT WE DO</p>
        <h2 className="t-display t-display-lg mt-6 max-w-[18ch] text-mg-white">
          A service menu, not a brochure.
        </h2>

        <div className="hairline-t mt-14">
          {services.map((s) => (
            <Row
              key={s.slug}
              service={s}
              isHovered={hovered === s.slug}
              isExpanded={expanded === s.slug}
              onHover={(h) => setHovered(h ? s.slug : null)}
              onToggle={() => setExpanded(expanded === s.slug ? null : s.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  service,
  isHovered,
  isExpanded,
  onHover,
  onToggle,
}: {
  service: Service;
  isHovered: boolean;
  isExpanded: boolean;
  onHover: (h: boolean) => void;
  onToggle: () => void;
}) {
  return (
    <div className="hairline-b">
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        aria-expanded={isExpanded}
        data-cursor={isExpanded ? "CLOSE" : "OPEN"}
        className="group relative flex w-full items-center gap-4 py-7 text-left md:gap-8 md:py-7"
      >
        {/* Red bar — slides in from left on hover */}
        <span
          aria-hidden
          className={[
            "absolute left-0 top-0 h-full w-[3px] origin-top bg-mg-red transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isHovered || isExpanded ? "scale-y-100" : "scale-y-0",
          ].join(" ")}
        />

        {/* Number */}
        <span className="t-mono shrink-0 pl-6 text-[12px] uppercase tracking-[0.22em] text-mg-ash md:pl-8">
          {service.index}
        </span>

        {/* Title */}
        <span
          className="t-display flex-1 text-[26px] leading-none tracking-[-0.02em] text-mg-white transition-[letter-spacing] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[32px] md:text-[36px]"
          style={{ letterSpacing: isHovered ? "-0.005em" : "-0.02em" }}
        >
          {service.name}
        </span>

        {/* Channels (hidden on mobile) */}
        <span className="t-mono hidden text-[11px] uppercase tracking-[0.22em] text-mg-ash lg:inline-block lg:w-[260px] lg:text-right">
          {service.channels}
        </span>

        {/* Image preview — slides in from right on hover (desktop only) */}
        <span
          aria-hidden
          className="relative ml-2 hidden h-[68px] w-[120px] shrink-0 overflow-hidden lg:block xl:h-[72px] xl:w-[140px]"
        >
          <span
            className={[
              "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isHovered ? "translate-x-0" : "translate-x-[110%]",
            ].join(" ")}
          >
            <Image
              src={service.preview}
              alt=""
              fill
              sizes="140px"
              className="object-cover"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
            />
          </span>
        </span>

        {/* +/− toggle */}
        <span className="t-mono shrink-0 pr-2 text-mg-white">
          {isExpanded ? (
            <Minus size={18} strokeWidth={1.4} />
          ) : (
            <Plus size={18} strokeWidth={1.4} />
          )}
        </span>
      </button>

      {/* Expand panel */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: easeMgOut }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-x-5 gap-y-6 pb-12 pl-6 pr-2 md:pl-8">
              <div className="col-span-12 md:col-span-7">
                <p className="t-body max-w-[58ch] text-mg-bone">{service.description}</p>
              </div>
              <div className="col-span-12 flex flex-col items-start justify-between gap-6 md:col-span-5 md:items-end md:text-right">
                <div>
                  <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
                    OUTCOME
                  </p>
                  <p className="t-mono mt-2 text-[14px] uppercase tracking-[0.16em] text-mg-white">
                    <span className="text-mg-red">→</span> {service.outcome}
                  </p>
                </div>
                {service.caseSlug && (
                  <Link
                    href={`/work/${service.caseSlug}`}
                    className="cta-text"
                    data-cursor="CASE"
                  >
                    See case <span className="arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// silence unused import warning for easeMg in some strict TS configs
void easeMg;
