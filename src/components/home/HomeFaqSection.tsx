"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import { homeBody, homeH2, homeSection } from "@/components/home/homeRhythm";

const HOME_FAQS = [
  {
    q: "Is INDEXLA custodial?",
    a: "No. You retain control of your assets and permissions.",
  },
  {
    q: "Do I own the underlying assets?",
    a: "Yes. INDEXLA is built around direct ownership, not a portfolio wrapper.",
  },
  {
    q: "Can INDEXLA withdraw my funds?",
    a: "No. Execution is restricted to the actions and limits you authorize.",
  },
  {
    q: "Can I stop automation?",
    a: "Yes. Revoke permissions at any time.",
  },
  {
    q: "What are the fees?",
    a: "0% management, performance and exit fees. A 1% fee applies only when trades execute.",
  },
  {
    q: "How do creators earn?",
    a: "Through execution-fee sharing, strategy access, marketplace rewards and $DEXLA tips.",
  },
] as const;

function HomeFaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-open={open ? "true" : "false"}
      className="border-b border-line last:border-b-0"
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-4 py-4 text-left sm:py-5"
        >
          <span className="display text-[1.05rem] leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-electric sm:text-[1.12rem]">
            {q}
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-electric transition-transform duration-200 ${
              open
                ? "rotate-45 border-electric/45 bg-electric/10"
                : "border-line bg-void/40 group-hover:border-electric/35"
            }`}
            aria-hidden
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        role="region"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pr-10 sm:pb-6">
            <p className={homeBody}>{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-2xl border border-line bg-void/40 px-5 sm:px-7">
            {HOME_FAQS.map((item, i) => (
              <HomeFaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore href="/faq" label="View All FAQs →" />
        </FadeIn>
      </div>
    </section>
  );
}
