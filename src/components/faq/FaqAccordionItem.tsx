"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaqAnswer } from "@/components/faq/FaqAnswer";
import { FaqInline } from "@/components/faq/faqInline";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start justify-between gap-4 py-4 text-left sm:py-5"
        >
          <span className="display text-[1.05rem] leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-electric sm:text-[1.12rem]">
            <FaqInline text={item.q} />
          </span>
          <span
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-electric transition-all duration-300 ${
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
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-10 sm:pb-6">
              <FaqAnswer blocks={item.a} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
