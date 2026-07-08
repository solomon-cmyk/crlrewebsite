import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import { IMAGES, SITE_URL } from "@/lib/assets";
import { organizationJsonLd, jsonLdScript, websiteJsonLd } from "@/lib/seo/jsonld";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Costa Rica Luxury Real Estate · Maravé Resort & Residences, Manuel Antonio",
    template: "%s · Costa Rica Luxury Real Estate",
  },
  description:
    "Costa Rica Luxury Real Estate is the developer and exclusive representative of Maravé LXR-branded residences in Manuel Antonio, plus exclusive Pacific coast listings.",
  keywords: [
    "Costa Rica luxury real estate",
    "Manuel Antonio real estate",
    "Maravé LXR Residences",
    "LXR branded residences Costa Rica",
    "Costa Rica Luxury Real Estate",
    "crlre.com",
    "Maravé pre-construction",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "CRLRE Blog RSS" }],
    },
  },
  openGraph: {
    title: "Costa Rica Luxury Real Estate · Maravé Resort & Residences",
    description:
      "116 LXR-branded residences in Manuel Antonio. Pre-construction reservations and exclusive Costa Rica listings.",
    type: "website",
    siteName: "Costa Rica Luxury Real Estate",
    locale: "en_US",
    images: [
      {
        url: IMAGES.og,
        width: 1200,
        height: 630,
        alt: "Maravé Resort & Residences overlooking the Pacific",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Costa Rica Luxury Real Estate · Maravé",
    description:
      "116 LXR-branded residences in Manuel Antonio. Pre-construction reservations and exclusive Costa Rica listings.",
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
        <link rel="alternate" type="application/rss+xml" title="CRLRE Blog" href="/feed.xml" />
      </head>
      <body className={`${cormorant.variable} ${jost.variable}`}>
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
