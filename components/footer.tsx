"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LiveClock } from "./live-clock";

const colSitemap = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work",     label: "Work" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];
const colServices = [
  { href: "/services#performance-advertising", label: "Performance Ads" },
  { href: "/services#lead-generation",          label: "Lead Gen & Funnels" },
  { href: "/services#creative-and-ai-production", label: "Creative & AI" },
  { href: "/services#website-and-ecommerce",    label: "Web & E-Comm" },
  { href: "/services#brand-and-positioning",    label: "Brand" },
];
const colSocial = [
  { href: "https://instagram.com/motorsportgrowth",       label: "Instagram" },
  { href: "https://www.linkedin.com/company/motorsportgrowth", label: "LinkedIn" },
  { href: "https://youtube.com/@motorsportgrowth",         label: "YouTube" },
];

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative w-full bg-mg-black px-5 pb-8 pt-24 md:px-8 md:pt-32"
    >
      <div className="mx-auto max-w-[1640px]">
        {/* ROW 1 — giant logo lockup + tag */}
        <div className="hairline-t pt-8">
          <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
            / TAGLINE
          </p>
          <Image
            src="/logos/mg-tagline.png"
            alt="Motorsport Growth"
            width={2500}
            height={1010}
            sizes="(min-width: 768px) 90vw, 100vw"
            priority={false}
            className="mt-6 h-auto w-full max-w-[1640px]"
          />
          <p className="t-mono mt-8 text-[12px] uppercase tracking-[0.32em] text-mg-bone">
            HORSEPOWER <span className="text-mg-red">→</span> PIPELINE
          </p>
        </div>

        {/* ROW 2 — 4 columns */}
        <div className="mt-20 hairline-t pt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          <FooterCol head="SITEMAP" items={colSitemap} />
          <FooterCol head="SERVICES" items={colServices} />
          <FooterCol head="SOCIAL" items={colSocial} external />
          <Newsletter />
        </div>

        {/* ROW 3 — fineprint */}
        <div className="mt-16 hairline-t pt-5 flex flex-wrap items-center justify-between gap-y-3 gap-x-6 t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
          <span>© 2026 Motorsport Growth — All rights reserved</span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="link-draw">Privacy</Link>
            <Link href="/terms" className="link-draw">Terms</Link>
            <span>v2.0.0</span>
            <LiveClock />
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  head,
  items,
  external = false,
}: {
  head: string;
  items: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
        / {head}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it.href}>
            {external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="t-mono link-draw text-[12px] uppercase tracking-[0.18em] text-mg-bone hover:text-mg-white"
                data-cursor="OPEN"
              >
                {it.label}
              </a>
            ) : (
              <Link
                href={it.href}
                className="t-mono link-draw text-[12px] uppercase tracking-[0.18em] text-mg-bone hover:text-mg-white"
                data-cursor="OPEN"
              >
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div>
      <p className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
        / NEWSLETTER
      </p>
      <p className="t-body mt-5 max-w-[28ch] text-[14px] text-mg-bone">
        One email a month. Operator-grade only. No fluff.
      </p>
      <form
        className="mt-5 flex items-center gap-3 hairline-b"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.includes("@")) {
            setSent(true);
            setEmail("");
          }
        }}
      >
        <input
          type="email"
          inputMode="email"
          required
          placeholder="you@brand.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent py-3 text-mg-white placeholder:text-mg-ash focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="t-mono text-[14px] text-mg-red"
          data-cursor="SUBSCRIBE"
        >
          →
        </button>
      </form>
      {sent && (
        <p className="t-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-mg-bone">
          ✓ ON THE LIST
        </p>
      )}
    </div>
  );
}
