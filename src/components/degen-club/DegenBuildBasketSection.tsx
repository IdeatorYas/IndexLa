"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  AllocationBar,
  ChainPills,
  DegenAccentHeadline,
  DegenCopy,
  EXAMPLE_ALLOCATIONS,
  MemeCoinLogo,
  MEME_COINS,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { dcLabel } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

const BUILD_STEPS = [
  "Choose the assets",
  "Set allocations",
  "Define rules",
  "Automate",
] as const;

function BuildBasketVisual() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,26rem)] lg:max-w-none">
      <TerminalShell title="Portfolio Builder" compact>
        <div className="flex flex-wrap items-center gap-1.5">
          {BUILD_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <span className="rounded-md border border-electric/30 bg-electric/10 px-2.5 py-1.5 text-[0.82rem] font-semibold text-ink sm:px-3 sm:py-2 sm:text-[0.9rem]">
                {step}
              </span>
              {i < BUILD_STEPS.length - 1 ? (
                <span className="text-[0.75rem] text-muted-dim" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
          {MEME_COINS.map((coin) => (
            <div
              key={coin.ticker}
              className="flex flex-col items-center gap-1 rounded-lg border border-line bg-void/40 px-1 py-1.5 sm:px-1.5 sm:py-2"
            >
              <MemeCoinLogo ticker={coin.ticker} size="xs" />
              <span className="text-[0.62rem] font-semibold text-muted sm:text-[0.68rem]">
                {coin.ticker}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-lg border border-electric/20 bg-electric/[0.04] p-2.5 sm:p-3">
          <p className={`${dcLabel} text-electric`}>Structured basket</p>
          <AllocationBar items={EXAMPLE_ALLOCATIONS} compact />
        </div>
      </TerminalShell>

      <div className="mt-2.5 sm:mt-3">
        <ChainPills compact />
      </div>
    </div>
  );
}

function BuildBasketCopy({ blocks }: { blocks: DegenSection["blocks"] }) {
  const chainLine = "Solana · Ethereum · Base · BNB · Multi-Chain";
  const filtered = blocks.filter(
    (b) => !(b.type === "p" && b.text.replace(/\*\*/g, "").trim() === chainLine)
  );

  return <DegenCopy blocks={filtered} className="space-y-2 sm:space-y-2.5" />;
}

export function DegenBuildBasketSection({ section }: { section: DegenSection }) {
  const copyBlocks = section.blocks.filter((b) => b.type !== "cta");
  const cta = section.blocks.find((b) => b.type === "cta");

  return (
    <section className="relative flex min-h-[100svh] items-center border-t border-line/80 bg-deep py-8 md:py-10 lg:py-12">
      <div className="section-pad container-max w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <FadeIn className="order-1 flex flex-col justify-center lg:order-none">
            <DegenAccentHeadline text={section.title} as="h2" align="left" />
            <div className="mt-4 hidden space-y-3 lg:mt-5 lg:block lg:space-y-3.5">
              <BuildBasketCopy blocks={copyBlocks} />
              {cta?.type === "cta" ? (
                <div className="pt-1">
                  <DegenCopy blocks={[cta]} />
                </div>
              ) : null}
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="order-2 lg:order-none">
            <BuildBasketVisual />
          </FadeIn>

          <FadeIn className="order-3 space-y-3 lg:hidden">
            <BuildBasketCopy blocks={copyBlocks} />
            {cta?.type === "cta" ? <DegenCopy blocks={[cta]} /> : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
