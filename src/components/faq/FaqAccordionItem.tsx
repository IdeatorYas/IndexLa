"use client";

import { useId, useState } from "react";
import { FaqAnswer } from "@/components/faq/FaqAnswer";
import type { FaqItem } from "@/components/faq/faqData";

export function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-electric sm:py-5"
        >
          <span className="display text-[1.05rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.12rem]">
            {item.q}
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-electric transition-transform duration-300 ${
              open ? "rotate-45 border-electric/40 bg-electric/10" : "bg-void/40"
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
        hidden={!open}
        className={open ? "pb-5 pr-10 sm:pb-6" : undefined}
      >
        {open ? <FaqAnswer paragraphs={item.a} /> : null}
      </div>
    </div>
  );
}
