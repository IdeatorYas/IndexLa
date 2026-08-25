"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  DegenAccentHeadline,
  DegenCopy,
} from "@/components/degen-club/DegenShared";
import type { DegenSection } from "@/lib/degen-club";

const BUILD_STEPS = [
  "Choose the assets",
  "Set allocations",
  "Define rules",
  "Automate",
] as const;

function BuildSteps() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-3">
        {BUILD_STEPS.map((step, i) => (
          <div key={step} className="relative flex items-stretch gap-3 lg:block">
            <div className="flex min-h-[7.5rem] flex-1 flex-col items-center justify-center rounded-2xl border border-electric/35 bg-gradient-to-b from-electric/[0.12] to-void/60 px-4 py-6 text-center shadow-[0_0_32px_-14px_rgba(56,189,248,0.5)] sm:min-h-[8.5rem] sm:px-5 sm:py-7">
              <p className="display text-[clamp(1.15rem,2.4vw,1.45rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {step}
              </p>
            </div>
            {i < BUILD_STEPS.length - 1 ? (
              <>
                <span
                  className="flex shrink-0 items-center justify-center text-[1.35rem] font-bold text-electric sm:hidden"
                  aria-hidden
                >
                  →
                </span>
                <span
                  className="pointer-events-none absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-[1.25rem] font-bold text-electric lg:block"
                  aria-hidden
                >
                  →
                </span>
              </>
            ) : null}
          </div>
        ))}
      </div>
      {/* Mid breakpoint: arrows between the 2×2 cells */}
      <p className="mt-4 hidden text-center text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-electric/80 sm:block lg:hidden">
        Choose the assets → Set allocations → Define rules → Automate
      </p>
    </div>
  );
}

function BuildCloser() {
  return (
    <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-12">
      <p className="display text-[clamp(1.45rem,3.4vw,2.05rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-ink">
        Multiple coins.
      </p>
      <p className="display mt-1.5 text-[clamp(1.45rem,3.4vw,2.05rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-ink">
        Multiple shots.
      </p>
      <p className="display mt-1.5 text-[clamp(1.45rem,3.4vw,2.05rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-ink">
        Multiple opportunities.
      </p>
      <p className="display mt-5 text-[clamp(1.75rem,4.2vw,2.55rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-electric sm:mt-6">
        A bigger chance of winning.
      </p>
    </div>
  );
}

export function DegenBuildBasketSection({ section }: { section: DegenSection }) {
  const leadBlocks = section.blocks.filter((b) => {
    if (b.type === "cta") return false;
    if (b.type !== "p") return false;
    const t = b.text.replace(/\*\*/g, "").trim();
    if (t === "Solana · Ethereum · Base · BNB · Multi-Chain") return false;
    if (t.startsWith("Choose the assets")) return false;
    if (t.startsWith("Multiple opportunities")) return false;
    if (t.startsWith("Defined allocations")) return false;
    if (t.startsWith("Rules-based execution")) return false;
    if (t.startsWith("Non-custodial ownership")) return false;
    if (t.startsWith("Multiple coins")) return false;
    if (t.startsWith("Multiple shots")) return false;
    if (t.startsWith("A bigger chance of winning")) return false;
    return true;
  });
  const cta = section.blocks.find((b) => b.type === "cta");

  return (
    <section className="relative flex min-h-0 items-center border-t border-line/80 bg-deep py-12 md:py-16 lg:py-20">
      <div className="section-pad container-max w-full">
        <FadeIn className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <DegenAccentHeadline text={section.title} as="h2" align="center" />

          {leadBlocks.length ? (
            <div className="mt-5 w-full max-w-2xl sm:mt-6">
              <DegenCopy
                blocks={leadBlocks}
                className="mx-auto space-y-2.5 text-center sm:space-y-3"
              />
            </div>
          ) : null}

          <div className="mt-8 w-full sm:mt-10">
            <BuildSteps />
          </div>

          <BuildCloser />

          {cta?.type === "cta" ? (
            <div className="mt-8 flex justify-center sm:mt-10">
              <DegenCopy blocks={[cta]} />
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
