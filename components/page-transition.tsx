"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Page transition: a single horizontal red bar wipes left to right
 * (~100ms enter), holds (~200ms) while content swaps, exits right (~100ms).
 *
 * Implemented via clip-path on a fixed full-viewport red div — much more
 * reliable than animating transform-origin keyframes (WAAPI can't
 * interpolate string transformOrigin values).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.18, delay: 0.22 } }}
          exit={{ opacity: 0, transition: { duration: 0.08 } }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={`wipe-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90]"
          style={{ background: "var(--color-mg-red)" }}
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          animate={{
            clipPath: [
              "inset(0% 100% 0% 0%)",
              "inset(0% 0% 0% 0%)",
              "inset(0% 0% 0% 0%)",
              "inset(0% 0% 0% 100%)",
            ],
            transition: {
              duration: 0.4,
              times: [0, 0.25, 0.75, 1],
              ease: "linear",
            },
          }}
        />
      </AnimatePresence>
    </>
  );
}
