"use client";

import { useEffect, useState } from "react";

/**
 * Live `prefers-reduced-motion: reduce` watcher.
 * Returns `true` when the OS-level setting is on.
 * Re-renders if the user toggles the setting at runtime.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
