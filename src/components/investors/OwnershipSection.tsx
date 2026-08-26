import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invPremiumAccent,
  invSection,
} from "@/components/investors/investorRhythm";

const pillars = [
  "No Index Token",
  "No Wrapper",
  "No Custody",
] as const;

export function OwnershipSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Own the Assets.{" "}
            <span className="gradient-text">Keep Control.</span>
          </h2>
          <div className={`mx-auto mt-6 max-w-2xl space-y-4 ${invBody}`}>
            <p>INDEXLA never takes custody of your capital.</p>
            <p>
              With INDEXLA Core, you own the underlying assets directly through
              your wallet.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-3xl auto-rows-fr gap-3 sm:grid-cols-3">
            {pillars.map((label) => (
              <div
                key={label}
                className={`${invPremiumAccent} flex h-full min-h-[7.25rem] items-center justify-center px-5 py-8 text-center`}
              >
                <p className="display text-[1.05rem] tracking-[-0.02em] text-electric sm:text-[1.15rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-4 text-center">
          <p className={`${invBody} font-semibold text-ink`}>
            You choose the assets, allocations, rules, limits and permissions.
          </p>
          <p className={invBody}>
            INDEXLA triggers only the execution you approve. Smart contracts
            enforce your boundaries.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
