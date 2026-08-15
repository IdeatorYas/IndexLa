"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AllocationChart } from "../AllocationChart";
import { useSimulator } from "../SimulatorContext";
import type { SimulatorPortfolio } from "../types";
import { surfaceClass } from "../ui";

export function PublishSuccess() {
  const { justCreatedId, resetDraft, published, setSelectedId } =
    useSimulator();
  const [portfolio, setPortfolio] = useState<SimulatorPortfolio | null>(() =>
    published.find((p) => p.id === justCreatedId) ?? published[0] ?? null,
  );
  const [copied, setCopied] = useState(false);
  const [flyOut, setFlyOut] = useState(false);

  useEffect(() => {
    if (!justCreatedId) return;
    const found = published.find((p) => p.id === justCreatedId);
    if (found) setPortfolio(found);
  }, [justCreatedId, published]);

  const shareLink = portfolio
    ? `https://indexla.tech/marketplace/${portfolio.id}`
    : "https://indexla.tech/marketplace";

  useEffect(() => {
    const t1 = window.setTimeout(() => setFlyOut(true), 280);
    const t2 = window.setTimeout(() => {
      document
        .getElementById("simulator-marketplace")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function viewAsInvestor() {
    if (portfolio) setSelectedId(portfolio.id);
    document
      .getElementById("simulator-marketplace")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function simulateAllocate() {
    if (portfolio) setSelectedId(portfolio.id);
    document
      .getElementById("simulator-marketplace")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mx-auto max-w-lg py-4">
      <div className="text-center">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/20 opacity-40" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-success/45 bg-success/15 text-2xl text-success shadow-[0_0_40px_rgba(52,211,153,0.25)]">
            ✓
          </div>
        </div>
        <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-success">
          Portfolio Live
        </p>
        <h3 className="display mt-2 text-[clamp(1.4rem,2.8vw,1.85rem)] font-semibold tracking-[-0.02em] text-ink">
          {portfolio
            ? `"${portfolio.name}" is live in Marketplace.`
            : "Your portfolio is now available in the INDEXLA Marketplace."}
        </h3>
        <p className="mt-3 text-[1.05rem] font-medium text-ink">
          Your audience can now allocate.
        </p>
        <p className="mt-2 text-[0.88rem] text-muted">
          Simulated — no wallet, no real funds.
        </p>
      </div>

      {portfolio ? (
        <div
          className={`${surfaceClass} mx-auto mt-6 max-w-sm p-4 transition-all duration-700 ease-out ${
            flyOut
              ? "translate-y-3 scale-[0.97] opacity-70"
              : "translate-y-0 scale-100 opacity-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <AllocationChart assets={portfolio.assets} size={56} />
            <div className="min-w-0 text-left">
              <p className="truncate text-[0.95rem] font-semibold text-ink">
                {portfolio.name}
              </p>
              <p className="truncate text-[0.78rem] text-muted">
                {portfolio.portfolioType}
              </p>
              <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-electric">
                Moving to Marketplace
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={viewAsInvestor}
        >
          View as Investor
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={simulateAllocate}
        >
          Simulate Allocate
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => void copyShare()}
        >
          {copied ? "Link Copied" : "Share Portfolio"}
        </Button>
      </div>

      <div className={`${surfaceClass} mt-6 p-5`}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Share Portfolio
        </p>
        <p className="mt-2 text-[0.88rem] text-muted">
          Simulated shareable link.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            readOnly
            value={shareLink}
            className="w-full truncate rounded-xl border border-white/10 bg-void/60 px-3 py-2.5 text-[0.82rem] text-muted"
          />
          <Button
            type="button"
            variant="secondary"
            className="!shrink-0 !px-4 !py-2.5 !text-[0.85rem]"
            onClick={() => void copyShare()}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
        </div>
      </div>

      <p className="mt-4 rounded-2xl border border-white/[0.08] bg-void/45 px-4 py-3 text-[0.9rem] leading-relaxed text-muted">
        Share with your friends or community to earn 50% of applicable execution
        fees.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          href="#simulator-marketplace"
          variant="secondary"
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          View Marketplace
        </Button>
        <Button
          variant="ghost"
          onClick={() => resetDraft()}
          className="!min-h-0 !px-5 !py-2.5 !text-[0.9rem]"
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
