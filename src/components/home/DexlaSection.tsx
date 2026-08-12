import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

const utilities = [
  "Make a portfolio public",
  "Promote your portfolio",
  "Save on platform fees",
  "Tip creators & ranking",
] as const;

const burns = [
  { title: "Creator Publishing", rate: "100% Burn" },
  { title: "Protocol Fees", rate: "10% Burn" },
  { title: "Promotion Fees", rate: "100% Burn" },
  { title: "Treasury Profits", rate: "25% Burn" },
] as const;

function cardNumber(i: number) {
  return `${String(i + 1).padStart(2, "0")} —`;
}

const utilityCard =
  "flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-success/35 bg-success/[0.06] px-5 py-6 text-center shadow-[inset_0_1px_0_0_rgba(52,211,153,0.14)]";

const burnCard =
  "flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-danger/35 bg-danger/[0.06] px-5 py-6 text-center shadow-[inset_0_1px_0_0_rgba(248,113,113,0.14)]";

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

        <div className="mt-10 space-y-8">
          <div>
            <FadeIn className="text-center">
              <h3 className={`${homeH3} text-success`}>4 Core Utilities</h3>
            </FadeIn>
            <div className="mt-5 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {utilities.map((item, i) => (
                <FadeIn key={item} delay={i * 0.04}>
                  <article className={utilityCard}>
                    <p className="text-[1.05rem] font-semibold leading-none tabular-nums tracking-[-0.01em] text-success sm:text-[1.125rem]">
                      {cardNumber(i)}
                    </p>
                    <p className="text-[1.05rem] leading-snug tracking-[-0.015em] text-ink text-pretty sm:text-[1.125rem]">
                      {item}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <FadeIn className="text-center">
              <h3 className={`${homeH3} text-danger`}>4 Burn Mechanisms</h3>
            </FadeIn>
            <div className="mt-5 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {burns.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.04}>
                  <article className={burnCard}>
                    <p className="text-[1.05rem] font-semibold leading-none tabular-nums tracking-[-0.01em] text-danger sm:text-[1.125rem]">
                      {cardNumber(i)}
                    </p>
                    <p className="text-[1.05rem] leading-snug tracking-[-0.015em] text-ink text-pretty sm:text-[1.125rem]">
                      {item.title}
                    </p>
                    <p className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-danger sm:text-[1.125rem]">
                      {item.rate}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
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
