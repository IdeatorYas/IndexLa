"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { DegenCopy, TerminalShell } from "@/components/degen-club/DegenShared";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

const EXIT_ASSETS = ["SOL", "ETH", "BNB", "USDC"] as const;

export function DegenFullExitSection({ section }: { section: DegenSection }) {
  const h3 = section.blocks.find((b) => b.type === "h3");
  const rest = section.blocks.filter((b) => b.type !== "h3");

  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className={`${dcH2} text-ink`}>{section.title}</h2>
            <DegenCopy blocks={rest.filter((b) => b.type === "p" && b.text.startsWith("When"))} className="mt-4" />
          </FadeIn>

          <FadeIn className="mt-10">
            <TerminalShell title="Portfolio Exit">
              <button
                type="button"
                className="mx-auto flex w-full max-w-md items-center justify-center rounded-xl border border-danger/40 bg-danger/15 px-6 py-4 text-[0.95rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:border-danger/60 hover:bg-danger/20"
              >
                {h3?.type === "h3" ? h3.text : "EXIT ENTIRE PORTFOLIO"}
              </button>
              <p className="mt-6 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                Convert everything into
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {EXIT_ASSETS.map((asset) => (
                  <span
                    key={asset}
                    className="rounded-lg border border-electric/30 bg-electric/10 px-4 py-2 text-[0.88rem] font-bold text-ink"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </TerminalShell>
          </FadeIn>

          <FadeIn className="mt-8">
            <DegenCopy
              blocks={rest.filter(
                (b) => !(b.type === "p" && b.text.startsWith("When"))
              )}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
