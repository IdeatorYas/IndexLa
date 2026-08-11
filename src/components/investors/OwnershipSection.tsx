"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const pillars = [
  { label: "No Index Token", detail: "Nothing synthetic standing in for ownership." },
  { label: "No Wrapper", detail: "No share token representing your portfolio." },
  { label: "No Custody", detail: "Assets stay in your wallet." },
  {
    label: "You Own The Underlying Assets",
    detail: "Direct ownership — your capital, your control.",
  },
];

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
          <p className={`mt-3 ${invBodyStrong}`}>
            No index token. No wrapper. No custody. You own the underlying
            assets.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {pillars.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.2rem] border border-line bg-deep/50 px-5 py-6 text-center"
              >
                <p className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
                  {item.label}
                </p>
                <p className="mt-2 text-[0.9rem] text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-2xl space-y-2 text-center">
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
