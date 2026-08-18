import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { EarlyAccessProvider } from "@/components/early-access/EarlyAccessProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://indexla.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "INDEXLA | Decentralized Portfolio Management",
  description:
    "One portfolio. Every asset. Every chain. Invest across crypto, tokenized stocks, commodities, and RWAs with automated, non-custodial strategies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "INDEXLA",
    title: "INDEXLA | Decentralized Portfolio Management",
    description:
      "One portfolio. Every asset. Every chain. Invest across crypto, tokenized stocks, commodities, and RWAs with automated, non-custodial strategies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "INDEXLA | Decentralized Portfolio Management",
    description:
      "One portfolio. Every asset. Every chain. Invest across crypto, tokenized stocks, commodities, and RWAs with automated, non-custodial strategies.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    title: "INDEXLA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <EarlyAccessProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </EarlyAccessProvider>
      </body>
    </html>
  );
}
