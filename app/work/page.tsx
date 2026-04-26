import type { Metadata } from "next";
import { WorkReel } from "@/components/work-reel";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected programs we've operated end-to-end. Numbers attached, on purpose.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative w-full bg-mg-black px-5 pb-12 pt-40 md:px-8 md:pt-48">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">INDEX / WORK</p>
          <h1
            className="t-display mt-8 max-w-[18ch] text-mg-white"
            style={{ fontSize: "clamp(64px, 13vw, 240px)" }}
          >
            The archive<span className="text-mg-red">.</span>
          </h1>
          <p className="t-body mt-12 max-w-[58ch] text-mg-bone">
            A short list. Every entry shipped, ran, and metered. Selectivity is the point.
          </p>
        </div>
      </section>

      <WorkReel />
    </>
  );
}
