"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { easeMg } from "@/lib/motion";

interface Voice {
  quote: string;
  name: string;
  role: string;
}

const voices: Voice[] = [
  {
    quote:
      "We brought MG in to fix media and they ended up rewiring the storefront. Best call we made all year.",
    name: "Reza A.",
    role: "Founder · 961 Motorsport",
  },
  {
    quote:
      "First agency that actually showed up to a race weekend. The deck reads like a build sheet, the work runs like one.",
    name: "Cody T.",
    role: "Driver · Destined Industries",
  },
  {
    quote:
      "Headless rebuild paid for itself in the first quarter. The team treats CVR like a stopwatch, which is exactly the energy we wanted.",
    name: "Alec V.",
    role: "Ops · Stage 4 Tuning",
  },
  {
    quote:
      "Identity finally matches what comes out of the booth. Out-of-state inquiries tripled in 90 days.",
    name: "Marcus G.",
    role: "Owner · Limitless Auto Collision",
  },
];

/**
 * Section 05 / VOICES — single testimonial in viewport.
 * Massive editorial italic quote, ragged. Hairline attribution block.
 * Prev/next arrows. NO auto-advance. NO dots.
 */
export function Voices() {
  const [i, setI] = useState(0);
  const cur = voices[i];

  return (
    <section
      id="voices"
      aria-label="What clients say"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <div className="flex items-end justify-between">
          <p className="t-eyebrow">05 / VOICES</p>
          <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
            {String(i + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-5">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ clipPath: "inset(0% 0% 0% 100%)" }}
                transition={{ duration: 0.55, ease: easeMg }}
                className="t-editorial italic text-mg-white"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 64px)",
                  lineHeight: 1.05,
                }}
              >
                <span className="text-mg-red">“</span>
                {cur.quote}
                <span className="text-mg-red">”</span>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-12 hairline-t pt-5 flex flex-wrap items-end justify-between gap-y-4">
              <div>
                <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-white">
                  {cur.name}
                </p>
                <p className="t-mono mt-1 text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                  {cur.role}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => setI((p) => (p - 1 + voices.length) % voices.length)}
                  className="hairline flex h-10 w-10 items-center justify-center text-mg-white transition-colors duration-200 hover:bg-mg-white hover:text-mg-black"
                  data-cursor="PREV"
                >
                  <ArrowLeft size={16} strokeWidth={1.4} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setI((p) => (p + 1) % voices.length)}
                  className="hairline flex h-10 w-10 items-center justify-center text-mg-white transition-colors duration-200 hover:bg-mg-white hover:text-mg-black"
                  data-cursor="NEXT"
                >
                  <ArrowRight size={16} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
