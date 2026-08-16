import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeH3,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

const utilities = [
  "Publish to earn",
  "Feature portfolio",
  "Fee Discounts",
  "Tips & Ranking",
  "Creator Strategy Access",
] as const;

const burns = [
  { title: "Creator Publishing fees", rate: "100%" },
  { title: "Protocol Fees", rate: "10%" },
  { title: "Promotion fees", rate: "100%" },
  { title: "Treasury Profits", rate: "25%" },
  { title: "Creator Strategy Access", rate: null },
] as const;

const utilityCard =
  "flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-success/35 bg-success/[0.06] px-5 py-6 text-center shadow-[inset_0_1px_0_0_rgba(52,211,153,0.14)]";

const burnCard =
  "flex h-full min-h-[8.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-danger/35 bg-danger/[0.06] px-5 py-6 text-center shadow-[inset_0_1px_0_0_rgba(248,113,113,0.14)]";

export function DexlaSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            $DEXLA The Utility &{" "}
            <span className="gradient-text">Deflation Engine</span>
          </h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            $DEXLA powers core platform and creator mechanics.
          </p>
        </FadeIn>

        <div className="mt-10 space-y-8">
          <div>
            <FadeIn className="text-center">
              <h3 className={`${homeH3} text-success`}>5 Core Utilities</h3>
            </FadeIn>
            <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {utilities.map((item) => (
                <FadeIn key={item}>
                  <article className={utilityCard}>
                    <p className="text-[1.1rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.15rem]">
                      {item}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn className="text-center">
              <h3 className={`${homeH2} text-danger`}>5 Burn Mechanisms</h3>
            </FadeIn>
            <div className="mt-5 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {burns.map((item) => (
                <FadeIn key={item.title}>
                  <article className={burnCard}>
                    <p className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.125rem]">
                      {item.title}
                    </p>
                    {item.rate ? (
                      <p className="text-[1.05rem] font-semibold text-danger sm:text-[1.125rem]">
                        ({item.rate})
                      </p>
                    ) : null}
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        <FadeIn className="mt-8 text-center">
          <p className={`${homeBody} font-semibold text-ink`}>
            Total Supply: 100,000,000 $DEXLA
          </p>
          <p className={`mt-3 ${homeBody} font-semibold text-ink`}>
            Fixed Supply · Real Utility · Usage-Linked Value Accrual
          </p>
          <Link
            href="/tokenomics"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            Read Tokenomics →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
