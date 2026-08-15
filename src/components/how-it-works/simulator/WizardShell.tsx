"use client";

import { Button } from "@/components/ui/Button";
import { useSimulator } from "./SimulatorContext";
import { WIZARD_STEPS, type WizardStep } from "./types";
import { CreateStep } from "./steps/CreateStep";
import { AssetsStep } from "./steps/AssetsStep";
import { AllocationStep } from "./steps/AllocationStep";
import { StrategyStep } from "./steps/StrategyStep";
import { ConfigureStep } from "./steps/ConfigureStep";
import { PermissionsStep } from "./steps/PermissionsStep";
import { AmountStep } from "./steps/AmountStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PublishSuccess } from "./steps/PublishSuccess";
import { MonitorStep } from "./steps/MonitorStep";
import { ManagePanel } from "./ManagePanel";
import { LivePreview, LivePreviewCompact } from "./LivePreview";
import { homeSection } from "@/components/home/homeRhythm";
import { surfaceClass } from "./ui";

const STEP_LABELS = WIZARD_STEPS;

const NEXT_HINT: Partial<Record<WizardStep, string>> = {
  create: "Next: select assets for your portfolio.",
  assets: "Next: set allocations to exactly 100%.",
  allocation: "Next: choose how your portfolio automates buys and sells.",
  strategy: "Next: configure the parameters for your selected strategy.",
  configure: "Next: authorize simulated execution permissions.",
  permissions: "Next: set your investment amount.",
  amount: "Next: review & publish to Marketplace.",
  review: "Publishing adds this portfolio to Marketplace instantly.",
  success: "Open Monitor to see your simulated portfolio status.",
};

function Progress() {
  const { step } = useSimulator();
  if (step === "success" || step === "monitor") return null;
  const activeIdx = STEP_LABELS.findIndex((s) => s.id === step);

  return (
    <div className="mb-6 overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1.5 sm:gap-2">
        {STEP_LABELS.map((s, i) => {
          const done = activeIdx > i;
          const current = s.id === step;
          return (
            <li key={s.id} className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] transition-all sm:px-3 sm:text-[0.7rem] ${
                  current
                    ? "border-electric/50 bg-electric/15 text-electric shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                    : done
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-white/[0.08] bg-void/40 text-muted-dim"
                }`}
              >
                {s.label}
              </span>
              {i < STEP_LABELS.length - 1 ? (
                <span className="text-muted-dim" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepBody() {
  const { step } = useSimulator();
  switch (step as WizardStep) {
    case "create":
      return <CreateStep />;
    case "assets":
      return <AssetsStep />;
    case "allocation":
      return <AllocationStep />;
    case "strategy":
      return <StrategyStep />;
    case "configure":
      return <ConfigureStep />;
    case "permissions":
      return <PermissionsStep />;
    case "amount":
      return <AmountStep />;
    case "review":
      return <ReviewStep />;
    case "success":
      return <PublishSuccess />;
    case "monitor":
      return <MonitorStep />;
    default:
      return <CreateStep />;
  }
}

export function HowItWorksSimulator() {
  const { step, goBack, goNext, canProceed, publish, draft, setStep } =
    useSimulator();
  const isReview = step === "review";
  const isSuccess = step === "success";
  const isMonitor = step === "monitor";
  const showNav = !isMonitor;
  const showPreviewRail =
    !isSuccess &&
    !isMonitor &&
    (draft.name.trim().length > 0 ||
      draft.portfolioType !== "" ||
      draft.assets.length > 0 ||
      draft.strategyId !== null ||
      draft.amountUsd > 0);

  return (
    <section className={`${homeSection} bg-void`} id="simulator">
      <div className="section-pad container-max">
        <div
          className={`grid items-start gap-6 ${
            showPreviewRail ? "xl:grid-cols-[minmax(0,1fr)_20rem]" : ""
          }`}
        >
          <div className={`${surfaceClass} p-5 sm:p-7 lg:p-8`}>
            <Progress />
            {!isSuccess && !isMonitor ? <LivePreviewCompact /> : null}
            <StepBody />

            {showNav ? (
              <div className="mt-8 border-t border-white/[0.07] pt-6">
                {NEXT_HINT[step] ? (
                  <p className="mb-4 text-center text-[0.82rem] text-muted">
                    {NEXT_HINT[step]}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {!isSuccess ? (
                    <Button
                      variant="ghost"
                      onClick={goBack}
                      className="!px-5 !py-2.5 text-[0.9rem]"
                      type="button"
                    >
                      Back
                    </Button>
                  ) : (
                    <span />
                  )}
                  {isReview ? (
                    <Button
                      onClick={() => publish()}
                      className={`!px-7 !py-3 ${!canProceed("review") ? "pointer-events-none opacity-40" : ""}`}
                      type="button"
                    >
                      Publish Portfolio
                    </Button>
                  ) : isSuccess ? (
                    <Button
                      onClick={() => setStep("monitor")}
                      className="!px-7 !py-3"
                      type="button"
                    >
                      Open Monitor
                    </Button>
                  ) : (
                    <Button
                      onClick={goNext}
                      className={`!px-7 !py-3 ${!canProceed(step) ? "pointer-events-none opacity-40" : ""}`}
                      type="button"
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            ) : null}

            {draft.editingId ? (
              <p className="mt-4 text-center text-[0.8rem] text-electric">
                Editing an existing Marketplace portfolio
              </p>
            ) : null}
          </div>

          <LivePreview />
        </div>

        {!isSuccess && !isMonitor ? <ManagePanel /> : null}
      </div>
    </section>
  );
}
