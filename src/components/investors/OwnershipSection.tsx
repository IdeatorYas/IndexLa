"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invH2,
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
            Own The Assets.{" "}
            <span className="gradient-text">Keep Control.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Your assets stay in your wallet.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
            {pillars.map((label) => (
              <div
                key={label}
                className="rounded-[1.2rem] border border-line bg-deep/55 px-5 py-8 text-center"
              >
                <p className="display text-[1.1rem] tracking-[-0.02em] text-ink sm:text-[1.2rem]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl space-y-3 text-center">
          <p className={invBodyStrong}>
            No index token. No wrapper. No custody. You own the underlying
            assets.
          </p>
          <p className={invBody}>
            You choose the assets, allocations, rules, and permissions.
          </p>
          <p className={invBodyStrong}>
            INDEXLA coordinates execution. You keep control.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
