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
          <p className={`mx-auto mt-4 max-w-2xl font-semibold text-ink ${invBody}`}>
            Your assets never leave your wallet. INDEXLA only receives the
            limited permissions you approve.
          </p>
        </FadeIn>

        <FadeIn className="mt-12">
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

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-4 text-center">
          <p className={`text-[1.05rem] leading-relaxed text-muted sm:text-[1.1rem]`}>
            Own the underlying assets directly — not a basket token, wrapper, or
            custodial position.
          </p>
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
