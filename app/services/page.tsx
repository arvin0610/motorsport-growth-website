import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services-index";
import { ProcessTimeline } from "@/components/process-timeline";
import { ContactBlock } from "@/components/contact-block";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Performance advertising, lead generation, creative production, web builds, and brand positioning for performance brands.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative w-full bg-mg-black px-5 pb-20 pt-40 md:px-8 md:pt-48">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">INDEX / SERVICES</p>
          <h1
            className="t-display mt-8 max-w-[18ch] text-mg-white"
            style={{ fontSize: "clamp(56px, 12vw, 220px)" }}
          >
            Five disciplines.
            <br />
            One operating model<span className="text-mg-red">.</span>
          </h1>
          <p className="t-body mt-12 max-w-[58ch] text-mg-bone">
            We don&apos;t sell scope; we operate programs. Each discipline below ships independently — they share a calendar, a dashboard, and an accountability line.
          </p>
        </div>
      </section>

      <ServicesIndex />
      <ProcessTimeline />
      <ContactBlock />
    </>
  );
}
