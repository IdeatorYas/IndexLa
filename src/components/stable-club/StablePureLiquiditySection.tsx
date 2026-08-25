"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { StableCta } from "@/components/stable-club/StableShared";
import { scH2, scSectionAlt } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

export function StablePureLiquiditySection({ section }: { section: StableSection }) {
  const cta = section.blocks.find((b) => b.type === "cta");
  const listBlock = section.blocks.find(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b.type === "p" &&
      (b.text.includes("No lending") || b.text.includes("No borrowing"))
  );

  const lines = listBlock
    ? listBlock.text.split("\n").map((l) => l.trim()).filter(Boolean)
    : [];

  return (
    <section className={scSectionAlt}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={scH2}>{section.title}</h2>

          <ul className="mx-auto mt-8 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {lines.map((line) => (
              <li
                key={line}
                className="rounded-xl border border-line bg-deep/55 px-4 py-3 text-[0.95rem] font-semibold text-ink shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              >
                {line.replace(/\*\*/g, "")}
              </li>
            ))}
          </ul>

          {cta?.type === "cta" ? (
            <div className="mt-10 flex justify-center">
              <StableCta label={cta.text} />
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
