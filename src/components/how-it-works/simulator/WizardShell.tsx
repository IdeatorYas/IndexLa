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
import { ManagePanel } from "./ManagePanel";
import { LivePreview, LivePreviewCompact } from "./LivePreview";
import { surfaceClass } from "./ui";

const STEP_LABELS = WIZARD_STEPS;

const NEXT_HINT: Partial<Record<WizardStep, string>> = {
  create: "Your thesis. Your portfolio.",
  assets: "Select what you own.",
  allocation: "Decide how much of each.",
  strategy: "Your rules. Their keys.",
  configure: "Trigger → Action → Amount → Frequency.",
  permissions: "Authorize execution — never withdrawals.",
  amount: "Simulate capital. Fees calculate instantly.",
  review: "Confirm everything, then publish to Marketplace.",
  success: "Your audience can now allocate.",
};

function Progress() {
  const { step } = useSimulator();
  if (step === "success") return null;
  const activeIdx = STEP_LABELS.findIndex((s) => s.id === step);

  return (
    <div className="mb-4 shrink-0 overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1 sm:gap-1.5">
        {STEP_LABELS.map((s, i) => {
          const done = activeIdx > i;
          const current = s.id === step;
          return (
            <li key={s.id} className="flex items-center gap-1 sm:gap-1.5">
              <span
                className={`inline-flex h-6 items-center rounded-full border px-2 text-[0.62rem] font-semibold uppercase tracking-[0.06em] transition-all sm:h-7 sm:px-2.5 sm:text-[0.68rem] ${
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
    default:
      return <CreateStep />;
  }
}

export function HowItWorksSimulator() {
  const { step, goBack, goNext, canProceed, publish, draft } = useSimulator();
  const isReview = step === "review";
  const isSuccess = step === "success";
  const showPreviewRail =
    !isSuccess &&
    (draft.name.trim().length > 0 ||
      draft.portfolioType !== "" ||
      draft.assets.length > 0 ||
      draft.strategyId !== null ||
      draft.amountUsd > 0);

  const fillViewport = !isSuccess;

  return (
    <section className="border-t border-white/[0.06] bg-void" id="simulator">
      <div className="container-max px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4 lg:px-8 lg:pb-10 lg:pt-5">
        <div
          className={`grid items-stretch gap-4 lg:gap-5 ${
            showPreviewRail
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)]"
              : ""
          } ${
            fillViewport
              ? "lg:min-h-[calc(100svh-4.25rem)] lg:h-[calc(100svh-4.25rem)]"
              : ""
          }`}
        >
          <div
            className={`${surfaceClass} flex min-h-0 flex-col p-4 sm:p-6 lg:p-7 ${
              fillViewport ? "lg:h-full lg:max-h-full" : ""
            }`}
          >
            <Progress />
            {!isSuccess ? <LivePreviewCompact /> : null}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5">
              <StepBody />
              {draft.editingId ? (
                <p className="mt-4 text-center text-[0.8rem] text-electric">
                  Editing an existing Marketplace portfolio
                </p>
              ) : null}
            </div>

            <div className="mt-5 shrink-0 border-t border-white/[0.07] pt-4">
              {NEXT_HINT[step] ? (
                <p className="mb-3 text-center text-[0.8rem] text-muted">
                  {NEXT_HINT[step]}
                </p>
              ) : null}
              {!isSuccess ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    className="!px-5 !py-2.5 text-[0.9rem]"
                    type="button"
                  >
                    Back
                  </Button>
                  {isReview ? (
                    <Button
                      onClick={() => publish()}
                      className={`!px-7 !py-3 ${!canProceed("review") ? "pointer-events-none opacity-40" : ""}`}
                      type="button"
                    >
                      Publish to Marketplace
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
              ) : null}
            </div>
          </div>

          <LivePreview />
        </div>

        {!isSuccess ? (
          <div className="mt-6">
            <ManagePanel />
          </div>
        ) : null}
      </div>
    </section>
  );
}
