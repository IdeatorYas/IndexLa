import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { invSection } from "@/components/investors/investorRhythm";

const TRUST_POINTS =
  "No Custody · No Black-Box Decisions · No Unauthorized Execution · No Guaranteed Returns";

export function InvestorDoesNotDoSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <article className="rounded-2xl border border-electric/35 bg-gradient-to-b from-electric/[0.1] via-void/60 to-void/80 px-5 py-7 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14),0_16px_40px_rgba(0,0,0,0.18)] sm:px-8 sm:py-8">
            <h2 className="display text-[clamp(1.15rem,3.2vw,1.45rem)] font-semibold uppercase tracking-[0.06em] text-ink text-balance">
              Built Around{" "}
              <span className="gradient-text">Your Control.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.92rem] font-semibold leading-snug tracking-[-0.01em] text-muted text-balance sm:text-[1rem]">
              {TRUST_POINTS}
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/whitepaper/14-security-privacy-and-mev-protection"
                className="inline-flex items-center gap-2 rounded-lg border border-electric/35 bg-electric/10 px-4 py-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-electric transition-colors hover:border-electric/55 hover:bg-electric/15 hover:text-ink"
              >
                Read Security &amp; Permissions
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
}
