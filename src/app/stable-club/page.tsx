import type { Metadata } from "next";
import { StableClubLanding } from "@/components/stable-club/StableClubLanding";

export const metadata: Metadata = {
  title: "STABLE CLUB | INDEXLA",
  description:
    "Put your stables to work. Earn trading fees and incentives from carefully selected liquidity pools with limited wallet permissions on INDEXLA.",
};

export default function StableClubPage() {
  return (
    <main>
      <StableClubLanding />
    </main>
  );
}
