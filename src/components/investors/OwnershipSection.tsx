"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const pillars = [
  "No index token",
  "No wrapper",
  "No custody",
] as const;

export function OwnershipSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Own the Assets.{" "}
            <span className="gradient-text">Keep Full Control.</span>
          </h2>
          <div className={`mx-auto mt-6 max-w-2xl space-y-3 ${invBody}`}>
            <p className="font-semibold text-ink">
              Your assets never leave your wallet.
            </p>
            <p className="font-semibold text-ink">
              INDEXLA only receives the limited permissions you approve.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            {pillars.map((label) => (
              <div
                key={label}
                className="rounded-[1.2rem] border border-line bg-deep/55 px-5 py-8 text-center"
              >
                <p className="display text-[1.05rem] tracking-[-0.02em] text-ink capitalize sm:text-[1.15rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-4 text-center">
          <p className={invBodyStrong}>
            You own the actual underlying assets across chains.
          </p>
          <p className="text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]">
            Unlike basket tokens or custodial products, you hold the real
            underlying assets in your own wallet.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
