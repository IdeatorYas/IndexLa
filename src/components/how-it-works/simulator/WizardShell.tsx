"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useSimulator } from "./SimulatorContext";
import { WIZARD_STEPS, type WizardStep } from "./types";
import { CreateStep } from "./steps/CreateStep";
import { AssetsAllocationStep } from "./steps/AssetsAllocationStep";
import { StrategyStep } from "./steps/StrategyStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PublishSuccess } from "./steps/PublishSuccess";
import { ManagePanel } from "./ManagePanel";
import { LivePreview, LivePreviewCompact } from "./LivePreview";
import { surfaceClass } from "./ui";

const STEP_LABELS = WIZARD_STEPS;

const NEXT_HINT: Partial<Record<WizardStep, string>> = {
  create: "Your thesis. Your portfolio.",
  assets: "Select assets and set allocation to 100%.",
  strategy: "Your rules. Their keys.",
  review: "Confirm, set investment, then authorize & publish.",
  success: "Your audience can now allocate.",
};

function IntroStrip() {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/[0.06] px-0.5 pb-2">
      <div className="min-w-0">
        <Link
          href="/"
          className="text-[0.75rem] font-semibold text-electric transition-colors hover:text-ink"
        >
          ← Back to INDEXLA
        </Link>
        <p className="display text-[clamp(0.95rem,1.6vw,1.1rem)] font-semibold tracking-[-0.02em] text-ink">
          How It <span className="gradient-text">Works</span>
          <span className="ml-2 text-[0.72rem] font-normal tracking-normal text-muted">
            Build · Strategy · Custody · Simulation
          </span>
        </p>
      </div>
      <p className="text-[0.72rem] text-muted">
        No wallet · No real transactions
      </p>
    </div>
  );
}

function Progress() {
  const { step } = useSimulator();
  if (step === "success") return null;
  const activeIdx = STEP_LABELS.findIndex((s) => s.id === step);
  const completed = Math.max(0, activeIdx);
  const pct = Math.round(((activeIdx + 1) / STEP_LABELS.length) * 100);

  return (
    <div className="shrink-0">
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Step {activeIdx + 1} of {STEP_LABELS.length}
        </p>
        <p className="text-[0.62rem] font-semibold tabular-nums text-electric">
          {pct}%
        </p>
      </div>
      <div className="mb-1.5 h-0.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric/80 to-electric transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="overflow-x-auto pb-0.5">
        <ol className="flex min-w-max items-center gap-1">
          {STEP_LABELS.map((s, i) => {
            const done = completed > i;
            const current = s.id === step;
            return (
              <li key={s.id} className="flex items-center gap-1">
                <span
                  className={`inline-flex h-6 items-center rounded-full border px-2 text-[0.58rem] font-semibold uppercase tracking-[0.07em] transition-all ${
                    current
                      ? "border-electric/50 bg-electric/15 text-electric"
                      : done
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-white/[0.08] bg-void/40 text-muted-dim"
                  }`}
                >
                  {s.label}
                </span>
                {i < STEP_LABELS.length - 1 ? (
                  <span className="text-[0.65rem] text-muted-dim" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function StepBody() {
  const { step } = useSimulator();
  switch (step as WizardStep) {
    case "create":
      return <CreateStep />;
    case "assets":
      return <AssetsAllocationStep />;
    case "strategy":
      return <StrategyStep />;
    case "review":
      return <ReviewStep />;
    case "success":
      return <PublishSuccess />;
    default:
      return <CreateStep />;
  }
}

function WizardNav() {
  const { step, goBack, goNext, canProceed, publish } = useSimulator();
  const isReview = step === "review";

  return (
    <div className="shrink-0 border-t border-white/[0.08] bg-void/95 px-3 py-2.5 backdrop-blur-sm sm:px-5">
      {NEXT_HINT[step] ? (
        <p className="mb-1.5 text-center text-[0.72rem] text-muted">
          {NEXT_HINT[step]}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={goBack}
          className="!px-4 !py-2 text-[0.88rem]"
          type="button"
        >
          Back
        </Button>
        {isReview ? (
          <Button
            onClick={() => publish()}
            className={`!px-5 !py-2 ${!canProceed("review") ? "pointer-events-none opacity-40" : ""}`}
            type="button"
          >
            Authorize & Publish Portfolio
          </Button>
        ) : (
          <Button
            onClick={goNext}
            className={`!px-5 !py-2 ${!canProceed(step) ? "pointer-events-none opacity-40" : ""}`}
            type="button"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export function HowItWorksSimulator() {
  const { step, draft } = useSimulator();
  const isSuccess = step === "success";

  /** Lock page scroll while the full-screen wizard is active. */
  useEffect(() => {
    if (isSuccess) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <>
        <section id="simulator" className="scroll-mt-20 border-t border-white/[0.06] bg-void py-8">
          <div className="container-max px-3 sm:px-5 lg:px-6">
            <div className={`${surfaceClass} mx-auto w-full max-w-2xl p-5 sm:p-7`}>
              <StepBody />
            </div>
          </div>
        </section>
        <ManagePanel />
      </>
    );
  }

  return (
    <>
      {/* Document-flow spacer so marketplace/footer sit below the fixed app. */}
      <div className="h-[calc(100svh-5rem)]" aria-hidden />

      <section
        id="simulator"
        className="fixed inset-x-0 top-20 bottom-0 z-30 flex flex-col overflow-hidden border-t border-white/[0.06] bg-void"
        aria-label="Portfolio simulator"
      >
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col px-3 py-2 sm:px-5 lg:px-6">
          <IntroStrip />

          <div className="mt-2 shrink-0">
            <Progress />
          </div>

          <div className="mt-2 grid min-h-0 flex-1 gap-2.5 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:items-stretch">
            <div
              className={`${surfaceClass} flex min-h-0 flex-col overflow-hidden`}
            >
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="shrink-0 px-3 pt-2.5 md:hidden">
                  <LivePreviewCompact />
                </div>
                <div className="min-h-0 flex-1 overflow-hidden px-3 sm:px-5">
                  <div className="h-full min-h-0">
                    <StepBody />
                  </div>
                </div>
                {draft.editingId ? (
                  <p className="shrink-0 px-4 pb-1 text-center text-[0.75rem] text-electric">
                    Editing an existing Marketplace portfolio
                  </p>
                ) : null}
              </div>
              <WizardNav />
            </div>

            <LivePreview />
          </div>
        </div>
      </section>

      {/* Manage panel stays in document flow below the spacer; visible after scroll unlock on success. */}
    </>
  );
}
