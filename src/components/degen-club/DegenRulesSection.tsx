"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { ChainPills, DegenCopy, DegenSectionTitle, TerminalShell } from "@/components/degen-club/DegenShared";
import { dcBody, dcSection } from "@/components/degen-club/degenRhythm";
import type { DegenSection } from "@/lib/degen-club";

export function DegenRulesSection({ section }: { section: DegenSection }) {
  const h3Blocks = section.blocks.filter((b) => b.type === "h3");
  const ruleDescriptions = section.blocks.filter(
    (b) =>
      b.type === "p" &&
      !b.text.startsWith("You define")
  );
  const closing = section.blocks.filter(
    (b) => b.type === "p" && b.text.startsWith("You define")
  );

  return (
    <section className={`${dcSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <DegenSectionTitle title={section.title} />
          </FadeIn>

          <FadeIn className="mt-8">
            <TerminalShell title="Rules Engine">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {h3Blocks.map((heading, i) => (
                  <div
                    key={heading.text}
                    className="rounded-xl border border-line bg-void/55 p-4 transition-colors hover:border-electric/30"
                  >
                    <p className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-electric sm:text-[1.15rem]">
                      {heading.text}
                    </p>
                    {ruleDescriptions[i] ? (
                      <p className={`mt-3 ${dcBody}`}>{ruleDescriptions[i].text}</p>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <ChainPills compact />
              </div>
            </TerminalShell>
          </FadeIn>

          {closing.length ? (
            <FadeIn className="mt-8 text-center">
              <DegenCopy blocks={closing.map((p) => ({ type: "p" as const, text: p.text }))} />
            </FadeIn>
          ) : null}
        </div>
      </div>
    </section>
  );
}
