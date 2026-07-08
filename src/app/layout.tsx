import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import { IMAGES, SITE_URL } from "@/lib/assets";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
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
  title: {
    default: "Maravé LXR · Rental Program Guide & Net Proceeds Estimator",
    template: "%s · Maravé LXR",
  },
  description:
    "A clear walk-through of the Maravé Rental Program: revenue split, reserve, personal use rights, and illustrative net proceeds estimates for owners.",
  keywords: [
    "Maravé LXR Residences",
    "Maravé rental program",
    "Manuel Antonio branded residences",
    "Costa Rica branded residence",
    "LXR Residences rental income",
    "net proceeds estimator",
    "Property Pro Partners",
    "crlre.com",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Maravé LXR Blog RSS" }],
    },
  },
  openGraph: {
    title: "Maravé LXR · Rental Program Guide",
    description:
      "See where every rental dollar actually goes. Illustrative estimates only, not projections or guarantees.",
    type: "website",
    siteName: "Maravé LXR Residences",
    locale: "en_US",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Maravé LXR Blog" href="/feed.xml" />
      </head>
      <body className={`${fraunces.variable} ${archivo.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([organizationJsonLd(), websiteJsonLd()])}
        />
        <CookieConsentProvider>
          {children}
          <CookieConsentBanner />
          <ConsentAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
