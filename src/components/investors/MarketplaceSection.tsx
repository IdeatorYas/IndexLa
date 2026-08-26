import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Explore portfolios built around different assets, markets and strategies.",
  },
  {
    n: "02",
    title: "Customize",
    body: "Adjust assets, allocations and automation rules around your conviction.",
  },
  {
    n: "03",
    title: "Build",
    body: "Create your own portfolio and strategy from the ground up.",
  },
] as const;

export function MarketplaceSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Discover. Customize.{" "}
            <span className="gradient-text">Build.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            You don&apos;t always need to start from scratch.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch xl:gap-3">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 xl:min-w-0 xl:flex-1 xl:flex-row xl:items-stretch"
              >
                <article
                  className={`${invPremiumSurface} flex h-full min-h-[13.5rem] flex-1 flex-col items-center px-5 py-7 text-center sm:px-6 sm:py-8`}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
                    {step.n} · {step.title}
                  </p>
                  <h3 className="mt-4 display text-[1.35rem] font-semibold tracking-[-0.025em] text-ink sm:text-[1.45rem]">
                    {step.title}
                  </h3>
                  <p className={`mt-4 flex-1 ${invBody}`}>{step.body}</p>
                </article>
                {i < STEPS.length - 1 ? (
                  <div
                    className="flex shrink-0 items-center justify-center text-electric/70 xl:w-5"
                    aria-hidden
                  >
                    <span className="text-[1.25rem] font-semibold xl:hidden">
                      ↓
                    </span>
                    <span className="hidden text-[1.2rem] font-semibold xl:inline">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-3xl text-center" delay={0.08}>
          <div className={invGreenBox}>
            <p className={invGreenText}>
              Don&apos;t Blindly Copy Someone Else&apos;s Conviction. Make It
              Yours.
            </p>
          </div>
          <div className="mt-7 flex justify-center">
            <Link href="/#discover-portfolios" className={`${homeCta} inline-flex`}>
              Explore Marketplace
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
