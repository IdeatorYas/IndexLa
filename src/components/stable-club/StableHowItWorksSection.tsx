"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { renderBold } from "@/components/stable-club/StableShared";
import { scBody, scH2, scSection } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

type Step = {
  num: string;
  title: string;
  detail?: string;
};

function parseSteps(blocks: StableBlock[]): { steps: Step[]; notes: string[] } {
  const steps: Step[] = [];
  const used = new Set<number>();

  blocks.forEach((block, index) => {
    if (block.type !== "h3") return;
    const match = block.text.match(/^(\d+)\s*[·.\-]\s*(.+)$/);
    if (!match) return;
    const next = blocks[index + 1];
    const detail = next?.type === "p" ? next.text : undefined;
    if (detail) used.add(index + 1);
    steps.push({
      num: match[1].padStart(2, "0"),
      title: match[2].trim(),
      detail,
    });
  });

  const notes = blocks.flatMap((block, index) =>
    block.type === "p" && !used.has(index) ? [block.text] : []
  );

  return { steps, notes };
}

export function StableHowItWorksSection({
  section,
  revokeLine,
}: {
  section: StableSection;
  revokeLine?: string;
}) {
  const { steps, notes } = parseSteps(section.blocks);

  return (
    <section className={scSection}>
      <div className="section-pad container-max">
        <FadeIn>
          <h2 className={scH2}>{section.title}</h2>

          {notes.length ? (
            <div className="mt-5 max-w-3xl space-y-3">
              {notes.map((note) => (
                <p key={note} className={scBody}>
                  {renderBold(note)}
                </p>
              ))}
            </div>
          ) : null}

          <ol className="mt-8 space-y-3">
            {steps.map((step) => (
              <li
                key={step.num}
                className="sc-card-elevated grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-3 p-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-4 sm:p-5"
              >
                <span className="display text-[1.15rem] font-semibold leading-none text-[var(--sc-blue)] sm:text-[1.3rem]">
                  {step.num}
                </span>
                <div className="min-w-0">
                  <p className="text-[1.02rem] font-semibold leading-snug text-[var(--sc-navy)] sm:text-[1.08rem]">
                    {step.title}
                  </p>
                  {step.detail ? (
                    <p className={`mt-1.5 ${scBody}`}>{step.detail}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          {revokeLine ? (
            <p className="mt-5 max-w-3xl text-[0.95rem] font-semibold leading-snug text-[var(--sc-navy)]">
              {revokeLine.replace(/\*\*/g, "")}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
