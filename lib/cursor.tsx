"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — 10px red dot. On any element marked with
 * `data-cursor="LABEL"` (or any anchor/button) it scales to 56px and shows
 * the label in mono. Empty `data-cursor=""` = hot but no label.
 *
 * Optional `data-cursor-mode="invert"` switches the cursor to a white disc
 * with `mix-blend-mode: difference` — used on nav menu links so the disc
 * inverts whatever it passes over (Awwwards-style scrubber effect).
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

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Tri-state: null = not hot. "" = hot, no label. "TEXT" = hot, with label.
    const setHot = (label: string | null, mode: string = "default") => {
      const el = ref.current;
      const lab = labelRef.current;
      if (!el || !lab) return;
      if (label === null) {
        el.dataset.hot = "0";
        el.dataset.mode = "default";
        lab.textContent = "";
      } else {
        el.dataset.hot = "1";
        el.dataset.mode = mode;
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
      const mode = interactive.getAttribute("data-cursor-mode") ?? "default";
      // Explicit attribute wins — empty string = hot with no label.
      if (explicit !== null) return setHot(explicit.trim(), mode);
      // Default labels by element type
      const tag = interactive.tagName.toLowerCase();
      if (tag === "a") return setHot("OPEN", mode);
      if (tag === "button") return setHot("CLICK", mode);
      setHot("VIEW", mode);
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], [data-cursor]')) return;
      setHot(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      data-hot="0"
      data-mode="default"
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
        /* Inverted mode — Awwwards scrubber: white disc through difference blend. */
        .mg-cursor[data-mode="invert"][data-hot="1"] {
          background: var(--color-mg-white);
          mix-blend-mode: difference;
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
        /* Inverted disc never shows a label — it's a pure shape. */
        .mg-cursor[data-mode="invert"] .mg-cursor__label { opacity: 0 !important; }
      `}</style>
    </div>
  );
}
