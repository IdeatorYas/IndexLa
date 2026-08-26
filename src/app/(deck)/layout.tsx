import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INDEXLA Investor Deck",
  robots: { index: false, follow: false },
};

export default function DeckLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div id="investor-deck-root">{children}</div>;
}
