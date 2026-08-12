"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { invSection } from "@/components/investors/investorRhythm";

export function InvestorFinalCta() {
  return (
    <section className={`${invSection} border-t border-line bg-deep py-10 md:py-12`}>
      <div className="section-pad container-max text-center">
        <FadeIn>
          <Button
            href="/creators"
            className="min-w-[15rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
          >
            Reserve Early Access
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
