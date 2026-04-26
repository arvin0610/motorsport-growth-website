import { LiveClock } from "./live-clock";
import { ContactForm } from "./contact-form";

const meta = [
  { label: "EMAIL",         value: "info@motorsportgrowth.com",  href: "mailto:info@motorsportgrowth.com" },
  { label: "LA HQ",         value: "Agoura Hills, CA",           href: undefined },
  { label: "RESPONSE TIME", value: "< 24 HRS",                    href: undefined },
  { label: "AVAILABILITY",  value: "Q2 2026 OPEN",                href: undefined },
  { label: "CALENDAR",      value: "BOOK A CALL →",              href: "/contact" },
  { label: "DM",            value: "@motorsportgrowth →",         href: "https://instagram.com/motorsportgrowth" },
];

export function ContactBlock() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <p className="t-eyebrow">06 / CONTACT</p>

        {/* Top half: oversized type */}
        <h2
          className="t-display mt-8 max-w-[18ch] text-mg-white"
          style={{ fontSize: "clamp(56px, 10vw, 200px)" }}
        >
          Ready to{" "}
          <span className="t-editorial italic text-mg-red">move?</span>
          <br />
          Pit lane is open<span className="text-mg-red">.</span>
        </h2>

        {/* 6-column metadata strip */}
        <div className="mt-20 grid grid-cols-2 gap-x-5 gap-y-8 hairline-t pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-3">
              <span className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
                {m.label}
              </span>
              {m.href ? (
                m.href.startsWith("http") ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    className="t-mono link-draw text-[14px] uppercase tracking-[0.16em] text-mg-white"
                    data-cursor="OPEN"
                  >
                    {m.value}
                  </a>
                ) : (
                  <a
                    href={m.href}
                    className="t-mono link-draw text-[14px] uppercase tracking-[0.16em] text-mg-white"
                    data-cursor="OPEN"
                  >
                    {m.value}
                  </a>
                )
              ) : (
                <span className="t-mono text-[14px] uppercase tracking-[0.16em] text-mg-white">
                  {m.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-24 hairline-t pt-12">
          <ContactForm />
        </div>

        {/* Footer-strip on this section */}
        <div className="mt-12 flex items-center justify-between hairline-t pt-5">
          <span className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash">
            INQUIRY / 2026
          </span>
          <LiveClock className="t-mono text-[10px] uppercase tracking-[0.22em] text-mg-ash" />
        </div>
      </div>
    </section>
  );
}
