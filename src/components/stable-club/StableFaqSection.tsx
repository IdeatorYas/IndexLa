"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { scH2, scSection } from "@/components/stable-club/stableRhythm";
import type { StableFaqItem, StableSection } from "@/lib/stable-club";

function StableFaqAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: StableFaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `stable-faq-${item.q.slice(0, 24).replace(/\W/g, "-")}`;

  return (
    <div
      data-open={open ? "true" : "false"}
      className="rounded-xl border border-[var(--sc-line)] bg-void/40 transition-colors hover:border-electric/25 data-[open=true]:border-electric/40 data-[open=true]:bg-void/55"
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-4"
        >
          <span className="display text-[1rem] leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-electric sm:text-[1.05rem]">
            {item.q}
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-200 ${
              open
                ? "rotate-45 border-electric/45 bg-electric/10 text-electric"
                : "border-line bg-void/40 text-electric group-hover:border-electric/35"
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
        id={panelId}
        role="region"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
            <p className="sc-body">{item.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StableFaqSection({ section }: { section: StableSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = section.faq ?? [];

  if (!items.length) return null;

  return (
    <section className={scSection}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <h2 className={`text-center ${scH2}`}>{section.title}</h2>

          <div className="mt-8 space-y-2.5">
            {items.map((item, i) => (
              <StableFaqAccordionItem
                key={item.q}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
