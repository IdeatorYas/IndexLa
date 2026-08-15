"use client";

import { Button } from "@/components/ui/Button";
import { useSimulator } from "./SimulatorContext";
import { WIZARD_STEPS, type WizardStep } from "./types";
import { CreateStep } from "./steps/CreateStep";
import { AssetsStep } from "./steps/AssetsStep";
import { StrategyStep } from "./steps/StrategyStep";
import { ConfigureStep } from "./steps/ConfigureStep";
import { PermissionsStep } from "./steps/PermissionsStep";
import { AmountStep } from "./steps/AmountStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PublishSuccess } from "./steps/PublishSuccess";
import { ManagePanel } from "./ManagePanel";
import { LivePreview, LivePreviewCompact } from "./LivePreview";
import { homeSection } from "@/components/home/homeRhythm";
import { surfaceClass } from "./ui";

const STEP_LABELS = WIZARD_STEPS;

const NEXT_HINT: Partial<Record<WizardStep, string>> = {
  create: "Next: select assets and set allocations to 100%.",
  assets: "Next: choose how your portfolio automates buys and sells.",
  strategy: "Next: configure the parameters for your selected strategy.",
  configure: "Next: authorize simulated execution permissions.",
  permissions: "Next: simulate USD impact across your allocations.",
  amount: "Next: review everything, then publish to Marketplace.",
  review: "Publishing adds this portfolio to Marketplace instantly.",
};

function Progress() {
  const { step } = useSimulator();
  const activeIdx = STEP_LABELS.findIndex((s) => s.id === step);

  return (
    <div className="mb-6 overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-1.5 sm:gap-2">
        {STEP_LABELS.map((s, i) => {
          const done = activeIdx > i || step === "success";
          const current = s.id === step;
          return (
            <li key={s.id} className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`inline-flex h-7 items-center rounded-full border px-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-all sm:px-3 sm:text-[0.72rem] ${
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
  const showNav = step !== "success";
  const isReview = step === "review";

  return (
    <section className={`${homeSection} bg-void`} id="simulator">
      <div className="section-pad container-max">
        <div className="mb-8 text-center">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Product Simulation
          </p>
          <h2 className="mt-2 display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
            Build A Portfolio End To End
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Create → Select → Allocate → Automate → Review → Publish → Marketplace.
            No wallet. No real transactions.
          </p>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className={`${surfaceClass} p-5 sm:p-7 lg:p-8`}>
            {step !== "success" ? <Progress /> : null}
            {step !== "success" ? <LivePreviewCompact /> : null}
            <StepBody />

            {showNav ? (
              <div className="mt-8 border-t border-white/[0.07] pt-6">
                {NEXT_HINT[step] ? (
                  <p className="mb-4 text-center text-[0.82rem] text-muted">
                    {NEXT_HINT[step]}
                  </p>
                ) : null}
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
                      Publish Portfolio
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

        <ManagePanel />
      </div>
    </section>
  );
}
