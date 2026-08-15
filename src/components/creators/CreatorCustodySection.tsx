import { FadeIn } from "@/components/ui/FadeIn";
import {
  crBody,
  crBodyStrong,
  crGreenBox,
  crGreenText,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorCustodySection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Your Audience Keeps{" "}
            <span className="gradient-text">Their Keys</span>
          </h2>

          <div className="mt-6 flex justify-center">
            <div className={crGreenBox}>
              <p className={`${crGreenText} text-balance`}>
                You Never Touch Their Funds.
              </p>
            </div>
          </div>

          <div className={`mt-6 space-y-3 ${crBody}`}>
            <p className="text-balance">
              No manual fund management. No custody. No access to their assets.
            </p>
            <p className="text-balance">
              Your audience keeps control and decides whether to follow,
              customize, and allocate.
            </p>
            <p className="text-balance">
              INDEXLA executes only what they authorize.
            </p>
            <p className={`${crBodyStrong} text-balance`}>
              You build the portfolio. They control the assets.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
