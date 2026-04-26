"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Pre-loader — 1.2s max, skippable on reduced-motion or returning visitors.
 *
 * Sequence:
 *  - Black screen
 *  - MG mark draws as a single hairline (SVG stroke-dashoffset)
 *  - Mono timestamp + "MOTORSPORT GROWTH / EST. 2024" types in
 *  - 3 · 2 · 1 · GO ticks (GO is red), then exits via clip-path wipe up
 */

const SHOWN_KEY = "mg-pre-shown";

export function Preloader() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = typeof window !== "undefined" && sessionStorage.getItem(SHOWN_KEY) === "1";
    if (reduce || seen) {
      document.documentElement.dataset.preReady = "1";
      return;
    }
    setShow(true);
    document.body.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setPhase(1), 60),    // logo draw
      setTimeout(() => setPhase(2), 380),   // mono types
      setTimeout(() => setPhase(3), 720),   // 3 2 1 ticks
      setTimeout(() => setPhase(4), 1080),  // GO + exit
      setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
        sessionStorage.setItem(SHOWN_KEY, "1");
        document.documentElement.dataset.preReady = "1";
      }, 1300),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[200] flex items-center justify-center bg-mg-black"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.35, ease: [0.6, 0.05, 0, 0.9] },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* MG mark drawing in */}
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              fill="none"
              aria-hidden
              className="text-mg-white"
            >
              <motion.path
                d="M 6 56 L 6 12 L 24 44 L 42 12 L 42 56 M 56 22 L 56 36 L 62 36 L 62 56 L 50 56"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, 0, 0.9] }}
              />
            </svg>

            {/* Mono types out */}
            <div className="t-mono text-[10px] uppercase tracking-[0.32em] text-mg-ash">
              <Typewriter
                show={phase >= 2}
                text={`MOTORSPORT GROWTH / EST. 2021 / ${todayStamp()}`}
              />
            </div>

            {/* 3 · 2 · 1 · GO */}
            <div className="t-mono mt-2 flex items-center gap-3 text-[12px] uppercase tracking-[0.32em]">
              <Tick label="3" on={phase >= 3} />
              <span className="text-mg-ink-60">·</span>
              <Tick label="2" on={phase >= 3} delay={120} />
              <span className="text-mg-ink-60">·</span>
              <Tick label="1" on={phase >= 3} delay={240} />
              <span className="text-mg-ink-60">·</span>
              <Tick label="GO" on={phase >= 4} red />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function todayStamp() {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

function Typewriter({ show, text }: { show: boolean; text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!show) return;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setI((prev) => (prev < text.length ? prev + 1 : prev));
    };
    const id = setInterval(tick, 14);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [show, text.length]);
  return (
    <span>
      {text.slice(0, i)}
      <span className="inline-block w-[7px] translate-y-[1px] border-b border-mg-white" aria-hidden />
    </span>
  );
}

function Tick({
  label,
  on,
  delay = 0,
  red = false,
}: {
  label: string;
  on: boolean;
  delay?: number;
  red?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4 }}
      transition={{ duration: 0.18, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={red ? "text-mg-red" : "text-mg-white"}
    >
      {label}
    </motion.span>
  );
}
