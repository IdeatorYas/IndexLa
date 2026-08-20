"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  DegenAccentHeadline,
  DegenCta,
  MemeCoinLogo,
  TerminalShell,
} from "@/components/degen-club/DegenShared";
import { MEME_COIN_COLORS } from "@/components/degen-club/memeLogos";
import { dcBody, dcLabel } from "@/components/degen-club/degenRhythm";
import type { DegenBlock, DegenSection } from "@/lib/degen-club";

const STEP_KEYS = ["CREATE", "PUBLISH", "COMMUNITY", "EARN"] as const;

type CreatorStep = { title: string; body: string };

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function parseCreatorsContent(blocks: DegenBlock[]) {
  const cta = blocks.find((b) => b.type === "cta");
  const nonCta = blocks.filter((b) => b.type !== "cta");

  const steps: CreatorStep[] = [];
  const intro: DegenBlock[] = [];
  const closing: DegenBlock[] = [];

  let i = 0;
  while (i < nonCta.length) {
    const block = nonCta[i];
    if (
      block.type === "h3" &&
      STEP_KEYS.includes(block.text.trim().toUpperCase() as (typeof STEP_KEYS)[number])
    ) {
      const title = block.text.trim().toUpperCase();
      const next = nonCta[i + 1];
      const body = next?.type === "p" ? next.text : "";
      steps.push({ title, body });
      i += next?.type === "p" ? 2 : 1;
      continue;
    }
    if (steps.length === 0) {
      intro.push(block);
    } else {
      closing.push(block);
    }
    i += 1;
  }

  return { intro, steps, closing, cta };
}

function CreatorSteps({ steps }: { steps: CreatorStep[] }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
      {steps.map((step) => (
        <article
          key={step.title}
          className="rounded-lg border border-amber-400/25 bg-amber-400/[0.05] px-2.5 py-2 sm:px-3 sm:py-2.5"
        >
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.11em] text-amber-300 sm:text-[0.7rem]">
            {step.title}
          </p>
          <p className="mt-0.5 text-[0.82rem] leading-[1.3] text-muted text-pretty sm:text-[0.92rem] sm:leading-snug">
            {step.body}
          </p>
        </article>
      ))}
    </div>
  );
}

const CREATOR_ALLOCATIONS = [
  { ticker: "PEPE", pct: 22 },
  { ticker: "WIF", pct: 18 },
  { ticker: "BONK", pct: 18 },
  { ticker: "DOGE", pct: 22 },
  { ticker: "SPX6900", pct: 20 },
] as const;

function SlimAllocationBar() {
  return (
    <div>
      <div className="flex h-1.5 overflow-hidden rounded-full border border-line">
        {CREATOR_ALLOCATIONS.map((item) => (
          <div
            key={item.ticker}
            style={{
              width: `${item.pct}%`,
              background: MEME_COIN_COLORS[item.ticker] ?? "#38bdf8",
            }}
            title={`${item.ticker} ${item.pct}%`}
          />
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1">
        {CREATOR_ALLOCATIONS.map((item) => (
          <span
            key={item.ticker}
            className="inline-flex items-center gap-1 rounded-md border border-line/70 bg-void/40 px-1.5 py-0.5 text-[0.6rem] font-semibold text-muted"
          >
            <MemeCoinLogo ticker={item.ticker} size="xs" className="!h-3.5 !w-3.5" />
            {item.ticker}
          </span>
        ))}
      </div>
    </div>
  );
}

function CreatorsVisual() {
  return (
    <div className="mx-auto w-full max-w-[min(100%,18rem)] lg:max-w-none">
      <TerminalShell title="Creator Distribution Engine" compact>
        <div className="flex flex-wrap items-center justify-center gap-1">
          {STEP_KEYS.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.08em] text-amber-300 sm:text-[0.65rem]">
                {step}
              </span>
              {i < STEP_KEYS.length - 1 ? (
                <span className="text-[0.58rem] text-muted-dim" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.05] p-2 sm:p-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <p className={`${dcLabel} text-amber-400/80`}>Creator Index</p>
            <p className="display text-[0.92rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.02rem]">
              DEGEN META
            </p>
          </div>
          <div className="mt-1.5">
            <SlimAllocationBar />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-success/30 bg-success/[0.07] px-2.5 py-1.5 sm:py-2">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-success sm:text-[0.65rem]">
            Creator revenue share
          </p>
          <p className="display text-[1.35rem] tabular-nums tracking-[-0.03em] text-ink sm:text-[1.55rem]">
            50%
          </p>
        </div>
      </TerminalShell>
    </div>
  );
}

function ThesisLine({ text }: { text: string }) {
  const parts = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return (
      <p className="display text-[clamp(0.95rem,1.8vw,1.2rem)] font-semibold leading-snug tracking-[-0.02em] text-ink text-balance">
        {renderBold(text)}
      </p>
    );
  }

  return (
    <p className="display text-[clamp(0.88rem,1.7vw,1.15rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
      {parts.map((part, i) => (
        <span key={part}>
          {i > 0 ? <span className="mx-1 text-muted-dim sm:mx-1.5">·</span> : null}
          {part}
        </span>
      ))}
    </p>
  );
}

function CreatorsIntro({ blocks }: { blocks: DegenBlock[] }) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {blocks.map((block, i) => (
        <p
          key={i}
          className={`${dcBody} !text-[0.9rem] !leading-snug sm:!text-[0.98rem]`}
        >
          {renderBold(block.text)}
        </p>
      ))}
    </div>
  );
}

function CreatorsClosing({ blocks }: { blocks: DegenBlock[] }) {
  return (
    <div className="space-y-1 sm:space-y-1.5">
      {blocks.map((block, i) => {
        if (block.type === "h3") {
          return (
            <DegenAccentHeadline
              key={i}
              text={block.text}
              as="h3"
              className="!text-[clamp(0.98rem,1.9vw,1.28rem)] !leading-tight"
            />
          );
        }

        if (block.type === "p" && block.text.includes("Your thesis")) {
          return <ThesisLine key={i} text={block.text} />;
        }

        if (
          block.type === "p" &&
          block.text.toLowerCase().includes("owning the basket")
        ) {
          return (
            <p
              key={i}
              className="display text-[clamp(0.98rem,1.9vw,1.25rem)] font-semibold leading-snug tracking-[-0.02em] text-ink text-balance"
            >
              {renderBold(block.text)}
            </p>
          );
        }

        return (
          <p
            key={i}
            className={`${dcBody} !text-[0.9rem] !leading-snug sm:!text-[0.98rem]`}
          >
            {renderBold(block.text)}
          </p>
        );
      })}
    </div>
  );
}

export function DegenCreatorsSection({ section }: { section: DegenSection }) {
  const { intro, steps, closing, cta } = parseCreatorsContent(section.blocks);

  return (
    <section className="relative flex min-h-0 items-center border-t border-line/80 bg-void py-7 md:py-9 lg:min-h-[100svh] lg:py-10">
      <div className="section-pad container-max w-full">
        <div className="mx-auto grid max-w-6xl items-center gap-4 sm:gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 xl:gap-10">
          <FadeIn className="flex flex-col justify-center">
            <DegenAccentHeadline
              text={section.title}
              as="h2"
              align="left"
              className="!text-[clamp(1.55rem,3.4vw,2.45rem)] !leading-[1.05]"
            />

            <div className="mt-3 space-y-3 sm:mt-3.5 sm:space-y-3.5">
              <CreatorsIntro blocks={intro} />
              <CreatorSteps steps={steps} />
              <div className="lg:hidden">
                <CreatorsVisual />
              </div>
              <CreatorsClosing blocks={closing} />
              {cta?.type === "cta" ? (
                <div className="pt-0.5">
                  <DegenCta label={cta.text} />
                </div>
              ) : null}
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="hidden lg:block">
            <CreatorsVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
