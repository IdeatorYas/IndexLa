"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { DegenCopy, DegenSectionTitle, TerminalShell } from "@/components/degen-club/DegenShared";
import { dcLabel, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenFullExitSection({ section }: { section: DegenSection }) {
  const h3 = section.blocks.find((b) => b.type === "h3");
  const whenOut = section.blocks.filter(
    (b) => b.type === "p" && b.text.startsWith("When")
  );
  const convertLabel = section.blocks.find(
    (b) => b.type === "p" && b.text.startsWith("Convert everything")
  );
  const assetsLine = section.blocks.find(
    (b) => b.type === "p" && b.text.includes("SOL")
  );
  const closing = section.blocks.filter(
    (b) =>
      b.type === "p" &&
      (b.text === "One action." || b.text === "Entire portfolio.")
  );

  const assets =
    assetsLine?.type === "p"
      ? assetsLine.text.split("·").map((s) => s.trim())
      : ["SOL", "ETH", "BNB", "USDC"];

  return (
    <section className={`${dcSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <DegenSectionTitle title={section.title} align="center" />
            {whenOut.length ? <DegenCopy blocks={whenOut} className="mt-4" /> : null}
          </FadeIn>

          <FadeIn className="mt-8">
            <TerminalShell title="Portfolio Exit">
              <button
                type="button"
                className="mx-auto flex w-full max-w-md items-center justify-center rounded-xl border border-danger/40 bg-danger/15 px-6 py-4 text-[1rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:border-danger/60 hover:bg-danger/20 sm:text-[1.05rem]"
              >
                {h3?.type === "h3" ? h3.text : "EXIT ENTIRE PORTFOLIO"}
              </button>
              {convertLabel?.type === "p" ? (
                <p className={`mt-6 ${dcLabel}`}>
                  {convertLabel.text.replace(/:$/, "")}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {assets.map((asset) => (
                  <span
                    key={asset}
                    className="rounded-lg border border-electric/30 bg-electric/10 px-4 py-2.5 text-[0.95rem] font-bold text-ink sm:text-[1rem]"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </TerminalShell>
          </FadeIn>

          {closing.length ? (
            <FadeIn className="mt-8">
              <DegenCopy blocks={closing} />
            </FadeIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
