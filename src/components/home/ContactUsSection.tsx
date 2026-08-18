import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/indexla-onchain-investing";

export function ContactUsSection() {
  return (
    <section className={`${homeSection} bg-void`} aria-labelledby="contact-us">
      <div className="section-pad container-max">
        <div className="mx-auto max-w-xl text-center">
          <h2 id="contact-us" className={homeH2}>
            Contact <span className="gradient-text">Us</span>
          </h2>
          <div className={`mt-6 flex flex-col items-center gap-3 ${homeBody}`}>
            <a
              href="mailto:contact@indexla.tech"
              className="font-medium text-electric transition-colors hover:text-ink"
            >
              contact@indexla.tech
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-electric transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
