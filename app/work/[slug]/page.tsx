import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Not found" };
  return {
    title: `${c.client} — ${c.title}`,
    description: c.excerpt,
    openGraph: {
      title: `${c.client} — ${c.title}`,
      description: c.excerpt,
      images: [{ url: c.hero, width: 1200, height: 630, alt: c.client }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      {/* HERO */}
      <section className="relative w-full bg-mg-black px-5 pb-12 pt-40 md:px-8 md:pt-48">
        <div className="mx-auto max-w-[1640px]">
          <Link href="/work" className="t-mono link-draw text-[11px] uppercase tracking-[0.22em] text-mg-ash" data-cursor="BACK">
            ← Archive
          </Link>

          <p className="t-eyebrow mt-12">
            {study.client} · {study.year} · {study.discipline.join(" / ")}
          </p>

          <h1
            className="t-display mt-6 max-w-[18ch] text-mg-white"
            style={{ fontSize: "clamp(48px, 10vw, 180px)" }}
          >
            {study.title}
          </h1>

          {/* 4-up stat row */}
          <div className="mt-16 hairline-t hairline-b py-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4 gap-x-5">
            {study.stats.map((s) => (
              <div key={s.label}>
                <span
                  className="t-display block text-mg-white"
                  style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 0.9 }}
                >
                  <span className="text-mg-red">+</span>
                  {s.value.replace(/^[+-]/, "")}
                </span>
                <p className="t-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-mg-ash">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED HERO IMAGE */}
      <section className="relative w-full bg-mg-black px-5 md:px-8">
        <div className="mx-auto max-w-[1640px]">
          <div className="img-plate relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={study.hero}
              alt={`${study.client} hero`}
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* PROBLEM / APPROACH / RESULT */}
      <section className="relative w-full bg-mg-black px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-12 gap-x-5 gap-y-12">
          {[
            { eyebrow: "01 / PROBLEM",  body: study.problem },
            { eyebrow: "02 / APPROACH", body: study.approach },
            { eyebrow: "03 / RESULT",   body: study.result },
          ].map((b) => (
            <div key={b.eyebrow} className="col-span-12 hairline-t pt-6 md:col-span-4">
              <p className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                {b.eyebrow}
              </p>
              <p className="t-body mt-6 max-w-[44ch] text-mg-bone">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative w-full bg-mg-black px-5 pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1640px] grid-cols-12 gap-5">
          {study.gallery.map((src, i) => {
            const wide = i % 3 === 0;
            return (
              <div
                key={src}
                className={`img-plate relative ${wide ? "col-span-12 md:col-span-8" : "col-span-12 md:col-span-4"} aspect-[4/3]`}
              >
                <Image
                  src={src}
                  alt={`${study.client} gallery ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* NEXT CASE */}
      <section className="relative w-full bg-mg-black px-5 py-32 md:px-8">
        <div className="mx-auto max-w-[1640px]">
          <p className="t-eyebrow">[ NEXT CASE ]</p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-6 grid grid-cols-12 gap-x-5 hairline-t hairline-b py-10"
            data-cursor="OPEN"
          >
            <div className="col-span-12 md:col-span-7">
              <h2
                className="t-display text-mg-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-mg-red"
                style={{ fontSize: "clamp(36px, 6vw, 100px)" }}
              >
                {next.title}
              </h2>
              <p className="t-mono mt-4 text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                {next.client} · {next.year}
              </p>
            </div>
            <div className="col-span-12 mt-6 flex items-end justify-end md:col-span-5 md:mt-0">
              <span className="cta-text">
                Read case <span className="arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
