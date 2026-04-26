import Link from "next/link";
import { Counter } from "./counter";

const paragraphs = [
  {
    drop: "[ ORIGIN ]",
    body:
      "We started inside the paddock, not inside an agency. The team has wrenched on race cars, pulled tire data, and shipped six-figure paint jobs. The marketing instincts came after the lap times.",
  },
  {
    drop: "[ APPROACH ]",
    body:
      "Every account is run like a race program — diagnose, tune, launch, measure, iterate. Forty-minute briefs. Two-week sprints. A live readout every Friday. No deck-ware, no dashboards-for-the-sake-of-dashboards.",
  },
  {
    drop: "[ EDGE ]",
    body:
      "Operators talk to operators. Our buyers know the lap times before they know the CPMs. Our photographers know which apex to shoot from. Our engineers have built carts as well as cars. That stack is rare and we lean into it.",
  },
];

export function Who() {
  return (
    <section
      id="who"
      aria-label="Who we are"
      className="relative w-full bg-mg-black px-5 py-32 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-[1640px]">
        <p className="t-eyebrow">01 / WHO</p>

        <div className="mt-12 grid grid-cols-12 gap-x-5 gap-y-12">
          {/* Sticky stat — 5 cols */}
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-32">
              <span
                aria-hidden
                className="t-display block text-mg-white"
                style={{
                  fontSize: "clamp(120px, 18vw, 320px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.85,
                }}
              >
                <span className="text-mg-red">+</span>
                <Counter to={412} suffix="%" />
              </span>
              <p className="t-mono mt-6 max-w-[40ch] text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                AVERAGE LEAD VOLUME LIFT — DESTINED INDUSTRIES, Q3 2025
              </p>
            </div>
          </div>

          {/* Dense paragraphs — 7 cols */}
          <div className="col-span-12 md:col-span-7">
            <h2 className="t-display t-display-md text-mg-white">
              We grew up in the paddock<span className="text-mg-red">.</span>
            </h2>

            <div className="mt-10 space-y-10">
              {paragraphs.map((p) => (
                <div key={p.drop} className="hairline-t pt-8">
                  <span className="t-mono text-[11px] uppercase tracking-[0.22em] text-mg-ash">
                    {p.drop}
                  </span>
                  <p className="t-body mt-3 max-w-[58ch] text-mg-bone">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <Link href="/about" className="cta-text" data-cursor="OPEN">
                More about the team <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
