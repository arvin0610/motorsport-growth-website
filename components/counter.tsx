"use client";

import { useEffect, useRef, useState } from "react";
import { cubicEaseMg } from "@/lib/motion";

/**
 * Counter — animates 0 → target on first viewport entry, ~1200ms,
 * mono-width to prevent layout shift. Never re-triggers.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1200,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              setValue(to * cubicEaseMg(t));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {Math.round(value).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
