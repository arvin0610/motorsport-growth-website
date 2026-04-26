import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-mg-black px-5 py-32 md:px-8">
      <div className="mx-auto max-w-[1640px]">
        <p className="t-eyebrow">[ 404 / OFF TRACK ]</p>
        <h1
          className="t-display mt-8 max-w-[14ch] text-mg-white"
          style={{ fontSize: "clamp(64px, 13vw, 200px)" }}
        >
          Wrong paddock<span className="text-mg-red">.</span>
        </h1>
        <p className="t-body mt-8 max-w-md text-mg-bone">
          The page you tried to load isn&apos;t on the grid. Head back to the index.
        </p>
        <div className="mt-12 flex flex-wrap gap-6">
          <Link href="/" className="btn-primary">
            Back to Home <span className="arrow">→</span>
          </Link>
          <Link href="/work" className="btn-secondary">
            See the Work <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
