import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const utilities = [
  "Publish portfolios & indexes",
  "Creator ecosystem access",
  "Fee discounts",
  "Governance & ecosystem participation",
] as const;

const burns = [
  "Creator publishing burns",
  "Protocol revenue buyback & burn",
  "Ecosystem activity burns",
  "Treasury-driven strategic burns",
] as const;

export function DexlaSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            $DEXLA — The Utility &{" "}
            <span className="gradient-text">Deflation Engine</span>
          </h2>
          <p className={`mx-auto mt-6 max-w-[40rem] ${homeBody}`}>
            $DEXLA powers the INDEXLA ecosystem through 4 core utilities and 4
            deflationary burn mechanisms designed to align token demand with
            platform growth.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <FadeIn>
            <div className="h-full rounded-3xl border border-success/35 bg-success/[0.06] px-6 py-6 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.14)] sm:px-7">
              <h3 className={`${homeH3} text-success`}>4 Core Utilities</h3>
              <ol className={`mt-5 space-y-3 ${homeBody}`}>
                {utilities.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="w-6 shrink-0 tabular-nums leading-[inherit] text-success">
                      {i + 1}.
                    </span>
                    <span className="leading-[inherit] text-ink">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="h-full rounded-3xl border border-danger/35 bg-danger/[0.06] px-6 py-6 shadow-[inset_0_1px_0_0_rgba(248,113,113,0.14)] sm:px-7">
              <h3 className={`${homeH3} text-danger`}>4 Burn Mechanisms</h3>
              <ol className={`mt-5 space-y-3 ${homeBody}`}>
                {burns.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="w-6 shrink-0 tabular-nums leading-[inherit] text-danger">
                      {i + 1}.
                    </span>
                    <span className="leading-[inherit] text-ink">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-7 text-center">
          <Link
            href="/tokenomics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            Read More → Tokenomics
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
