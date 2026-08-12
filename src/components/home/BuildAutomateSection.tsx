import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import { homeBody, homeH2, homeSection } from "@/components/home/homeRhythm";

export function BuildAutomateSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            Build & Automate Your Portfolio in{" "}
            <span className="gradient-text">Under 5 Minutes</span>
          </h2>
          <p className={`mx-auto mt-7 max-w-[40rem] ${homeBody}`}>
            The next generation of investors expects speed, simplicity, and
            control. INDEXLA brings multi-asset portfolios, programmable
            strategies, and non-custodial execution into a single layer.
          </p>
          <p className={`mx-auto mt-5 max-w-[40rem] ${homeBody}`}>
            Build your portfolio and automate execution across chains and
            assets.
          </p>
          <HomeReadMore href="/investors" className="mt-5" />
        </FadeIn>
      </div>
    </section>
  );
}
