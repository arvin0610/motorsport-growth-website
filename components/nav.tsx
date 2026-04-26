"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LiveClock } from "./live-clock";

const links = [
  { href: "/services", label: "Services", index: "01" },
  { href: "/work",     label: "Work",     index: "02" },
  { href: "/about",    label: "About",    index: "03" },
  { href: "/contact",  label: "Contact",  index: "04" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile overlay is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300",
        solid
          ? "bg-mg-black border-b border-mg-ink-60"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1640px] items-center justify-between px-5 md:px-8">
        {/* Logo lockup — MG Logo-08.png */}
        <Link
          href="/"
          aria-label="Motorsport Growth — Home"
          className="inline-flex items-center"
          data-cursor="HOME"
        >
          <Image
            src="/logos/mg-nav.png"
            alt="Motorsport Growth"
            width={4821}
            height={1010}
            priority
            sizes="(min-width: 768px) 180px, 140px"
            className="h-[28px] w-auto md:h-[32px]"
          />
        </Link>

        {/* Desktop right cluster */}
        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="t-mono link-draw text-[12px] uppercase tracking-[0.18em] text-mg-bone hover:text-mg-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="cta-text"
            aria-label="Start a project"
          >
            Start a Project <span className="arrow">→</span>
          </Link>
        </nav>

        {/* Mobile open */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden text-mg-white"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-mg-black md:hidden">
          <div className="flex h-16 items-center justify-between px-5 hairline-b">
            <Image
              src="/logos/mg-nav.png"
              alt="Motorsport Growth"
              width={5391}
              height={1010}
              sizes="140px"
              className="h-[28px] w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-mg-white"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-between p-5">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href} className="hairline-b">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-5 py-6"
                  >
                    <span className="t-mono text-[10px] tracking-[0.28em] text-mg-ash">
                      {l.index}
                    </span>
                    <span className="t-display text-[clamp(40px,9vw,72px)] leading-none tracking-[-0.03em] text-mg-white">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-end justify-between pt-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="cta-text"
              >
                Start a Project <span className="arrow">→</span>
              </Link>
              <LiveClock className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
