import type { Metadata } from "next";
import Image from "next/image";
import { Who } from "@/components/who";
import { Voices } from "@/components/voices";
import { ContactBlock } from "@/components/contact-block";

export const metadata: Metadata = {
  title: "About",
  description:
    "Motorsport Growth is a Los Angeles studio operating performance marketing programs for the motorsport industry.",
};

const milestones = [
  { year: "2021", body: "Founded out of a garage in Agoura Hills. First retainer: a privateer Formula Drift program." },
  { year: "2022", body: "First headless Shopify rebuild for a Turn14 reseller. Catalogue depth fixed, fitment data finally honest." },
  { year: "2023", body: "Crossed $10M revenue driven across the book. First multi-event motorsport activation signed." },
  { year: "2024", body: "Formalised the operator model: diagnose, tune, launch, measure, iterate. One war room per client." },
  { year: "2025", body: "$24M+ revenue driven, 40+ brands deep. Race Program Activation added as a standalone offer." },
  { year: "2026", body: "Booking nine months out. Two new programs accepted per quarter. The roster stays small on purpose." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative w-full bg-mg-black px-5 pb-16 pt-40 md:px-8 md:pt-48">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">INDEX / ABOUT</p>
          <h1
            className="t-display mt-8 max-w-[16ch] text-mg-white"
            style={{ fontSize: "clamp(56px, 12vw, 220px)" }}
          >
            A studio that{" "}
            <span className="t-editorial italic text-mg-white">races</span>
            <span className="text-mg-red">.</span>
          </h1>
          <p className="t-body mt-12 max-w-[60ch] text-mg-bone">
            Built by people who knew the lap times before they knew the CPMs. Photographers who shoot from the apex. Engineers who&apos;ve built carts as well as cars. Buyers who watch live timing as closely as live attribution.
          </p>
        </div>
      </section>

      <Who />

      {/* TIMELINE */}
      <section className="relative w-full bg-mg-black px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">[ TIMELINE / 2021 → 2026 ]</p>
          <ol className="mt-12 grid grid-cols-1 gap-y-2">
            {milestones.map((m, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-x-5 hairline-t py-6"
              >
                <div className="col-span-3 md:col-span-2">
                  <span
                    className="t-display block text-mg-white"
                    style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
                  >
                    {m.year}
                  </span>
                </div>
                <p className="col-span-9 max-w-[60ch] t-body text-mg-bone md:col-span-9 md:col-start-4">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Voices />
      <ContactBlock />
    </>
  );
}
