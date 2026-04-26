"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — 8px red circle. On any element marked with
 * `data-cursor="LABEL"` (or any anchor/button) it scales to 56px and shows
 * the label in mono. Empty `data-cursor=""` means "hot but no label" —
 * useful on nav links where the label adds noise.
 *
 * Hidden on coarse pointers and on prefers-reduced-motion: reduce.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    // Tri-state: null = not hot. "" = hot, no label. "TEXT" = hot, with label.
    const setHot = (label: string | null) => {
      const el = ref.current;
      const lab = labelRef.current;
      if (!el || !lab) return;
      if (label === null) {
        el.dataset.hot = "0";
        lab.textContent = "";
      } else {
        el.dataset.hot = "1";
        lab.textContent = label;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor]'
      );
      if (!interactive) return setHot(null);
      const explicit = interactive.getAttribute("data-cursor");
      // Explicit attribute wins — empty string = hot with no label.
      if (explicit !== null) return setHot(explicit.trim());
      // Default labels by element type
      const tag = interactive.tagName.toLowerCase();
      if (tag === "a") return setHot("OPEN");
      if (tag === "button") return setHot("CLICK");
      setHot("VIEW");
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], [data-cursor]')) return;
      setHot(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      data-hot="0"
      aria-hidden
      className="mg-cursor pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <span ref={labelRef} className="mg-cursor__label" />
      <style jsx>{`
        .mg-cursor {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--color-mg-red);
          will-change: transform, width, height;
          transition: width 240ms var(--ease-mg-out), height 240ms var(--ease-mg-out),
            background 240ms var(--ease-mg-out);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mg-cursor[data-hot="1"] {
          width: 56px;
          height: 56px;
          background: var(--color-mg-red);
        }
        .mg-cursor__label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-mg-white);
          opacity: 0;
          transition: opacity 200ms var(--ease-mg-out);
          white-space: nowrap;
        }
        .mg-cursor[data-hot="1"] .mg-cursor__label:not(:empty) {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
