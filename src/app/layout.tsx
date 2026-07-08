import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import { IMAGES, SITE_URL } from "@/lib/assets";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Maravé LXR · Rental Program Guide & Net Proceeds Estimator",
  description:
    "A clear walk-through of the Maravé Rental Program: revenue split, reserve, personal use rights, and illustrative net proceeds estimates for owners.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maravé LXR · Rental Program Guide",
    description:
      "See where every rental dollar actually goes. Illustrative estimates only, not projections or guarantees.",
    type: "website",
    images: [
      {
        url: IMAGES.og,
        width: 1200,
        height: 630,
        alt: "Aerial rendering of Maravé at sunset overlooking the Pacific Ocean",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maravé LXR · Rental Program Guide",
    description:
      "See where every rental dollar actually goes. Illustrative estimates only, not projections or guarantees.",
    images: [IMAGES.og],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${archivo.variable}`}>
        <CookieConsentProvider>
          {children}
          <CookieConsentBanner />
          <ConsentAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
