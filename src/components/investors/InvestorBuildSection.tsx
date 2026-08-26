import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";

const STEPS = [
  {
    n: "01",
    title: "BUILD",
    body: "Connect your wallet, choose your assets and define your allocations.",
  },
  {
    n: "02",
    title: "DEFINE",
    body: "Set your conditions, thresholds, percentages, limits and expiry.",
  },
  {
    n: "03",
    title: "AUTOMATE",
    body: "Approve the permissions. INDEXLA monitors your selected conditions and triggers execution when your rules are met.",
  },
] as const;

export function InvestorBuildSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Build. Define.{" "}
            <span className="gradient-text">Automate.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto grid max-w-5xl auto-rows-fr gap-3 lg:grid-cols-3">
            {STEPS.map((step) => (
              <article
                key={step.n}
                className={`${invPremiumSurface} flex h-full min-h-[14rem] flex-col px-5 py-7 text-center sm:px-6 sm:py-8`}
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                  {step.n} — {step.title}
                </p>
                <h3 className="mt-4 display text-[1.35rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.45rem]">
                  {step.title}
                </h3>
                <p className={`mt-4 flex-1 ${invBody}`}>{step.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl text-center" delay={0.08}>
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Your Decision → Automated Monitoring → Approved Execution
            </p>
          </div>
          <div className={`mx-auto mt-6 max-w-2xl space-y-3 ${invBody}`}>
            <p>
              Smart contracts enforce the permissions and limits you define.
            </p>
            <p>
              If data is stale, conditions are invalid or approved limits are
              exceeded, execution does not proceed.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
