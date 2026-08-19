import type { Metadata } from "next";
import { DegenClubLanding } from "@/components/degen-club/DegenClubLanding";

export const metadata: Metadata = {
  title: "DEGEN CLUB | INDEXLA",
  description:
    "The new way to play memecoins. Build the basket, define the rules, and automate rules-based memecoin portfolios with DEGEN CLUB on INDEXLA.",
};

export default function DegenClubPage() {
  return (
    <main>
      <DegenClubLanding />
    </main>
  );
}
