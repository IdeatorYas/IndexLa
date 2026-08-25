"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { renderBold } from "@/components/stable-club/StableShared";
import { scBody, scH2, scSection } from "@/components/stable-club/stableRhythm";
import type { StableBlock, StableSection } from "@/lib/stable-club";

const STEPS = [
  { num: "01", label: "Connect Wallet" },
  { num: "02", label: "Choose Strategy" },
  { num: "03", label: "Sign Limited Permission" },
];

function HowItWorksVisual({
  stepsLine,
  exitLine,
  revokeLine,
}: {
  stepsLine: string;
  exitLine?: string;
  revokeLine?: string;
}) {
  const labels = stepsLine
    .replace(/\*\*/g, "")
    .split("→")
    .map((s) => s.trim());

  const exitParts = exitLine
    ? exitLine.replace(/\*\*/g, "").split(".").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="sc-card-elevated p-5 sm:p-6 lg:p-7">
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.num} className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--sc-line)] bg-[var(--sc-blue-soft)]">
              <span className="display text-[1.1rem] font-semibold text-[var(--sc-blue)]">
                {step.num}
              </span>
            </div>
            <p className="mt-3 text-[0.92rem] font-semibold leading-snug text-[var(--sc-navy)]">
              {labels[i] ?? step.label}
            </p>
            {i < STEPS.length - 1 ? (
              <span
                className="pointer-events-none absolute right-0 top-7 hidden translate-x-1/2 text-[var(--sc-muted-dim)] sm:inline"
                aria-hidden
              >
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {(exitParts.length || revokeLine) ? (
        <div className="mt-6 grid gap-3 border-t border-[var(--sc-line)] pt-5 sm:grid-cols-2">
          {revokeLine ? (
            <div className="rounded-xl border border-[var(--sc-teal)]/20 bg-[var(--sc-teal-soft)] px-4 py-3 text-center">
              <p className="text-[0.88rem] font-semibold leading-snug text-[var(--sc-navy)]">
                {revokeLine.replace(/\*\*/g, "")}
              </p>
            </div>
          ) : null}
          {exitParts.slice(0, revokeLine ? 1 : 2).map((part) => (
            <div
              key={part}
              className="rounded-xl border border-[var(--sc-line)] bg-[var(--sc-bg-alt)] px-4 py-3 text-center"
            >
              <p className="text-[0.88rem] font-semibold leading-snug text-[var(--sc-navy)]">
                {part}.
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function StableHowItWorksSection({
  section,
  revokeLine,
}: {
  section: StableSection;
  revokeLine?: string;
}) {
  const stepsBlock = section.blocks.find(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b.type === "p" && b.text.includes("→")
  );
  const bodyBlocks = section.blocks.filter(
    (b): b is Extract<StableBlock, { type: "p" }> =>
      b !== stepsBlock && b.type === "p"
  );
  const exitBlock = bodyBlocks.find((b) => b.text.startsWith("Exit anytime"));

  return (
    <section className={scSection}>
      <div className="section-pad container-max">
        <FadeIn className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <h2 className={scH2}>{section.title}</h2>
            {stepsBlock ? (
              <p className={`mt-5 ${scBody} font-semibold text-[var(--sc-navy)]`}>
                {renderBold(stepsBlock.text)}
              </p>
            ) : null}
            <div className="mt-5 space-y-3">
              {bodyBlocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className={scBody}>
                    {renderBold(block.text)}
                  </p>
                ) : null
              )}
            </div>
          </div>

          {stepsBlock ? (
            <HowItWorksVisual
              stepsLine={stepsBlock.text.replace(/\*\*/g, "")}
              exitLine={exitBlock?.text}
              revokeLine={revokeLine}
            />
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
