import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://instantautoinsurance.org"),
  title: {
    default: "Instant Auto Insurance | Get Covered Today",
    template: "%s | InstantAutoInsurance.org"
  },
  description:
    "Shop auto insurance options quickly. Get help with liability, full coverage, SR-22 filings, and same-day proof of insurance from a licensed agent.",
  keywords: [
    "instant auto insurance",
    "same day car insurance",
    "car insurance today",
    "SR-22 insurance",
    "cheap auto insurance",
    "proof of insurance"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Instant Auto Insurance | Get Covered Today",
    description: "Fast help finding auto insurance, SR-22 filings, and same-day proof of coverage.",
    url: "https://instantautoinsurance.org",
    siteName: "InstantAutoInsurance.org",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
