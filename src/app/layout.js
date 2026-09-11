import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "&&",
  alternateName: ["andand", "and and"],
  url: "https://andand.space",
  logo: "https://andand.space/images/logo.png",
  image: "https://andand.space/images/og-image.jpg",
  description:
    "Interior design firm and spatial design practice based in Copenhagen and New York. We specialize in commercial interior design, architecture, and brand environments for offices, retail, restaurants, and hospitality spaces.",
  email: "office@andand.space",
  telephone: "+4520640262",
  priceRange: "$$$$",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Copenhagen Office",
      addressLocality: "Copenhagen",
      postalCode: "2300",
      addressCountry: "DK",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "New York Office",
      addressLocality: "New York",
      postalCode: "10001",
      addressCountry: "US",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Copenhagen", containedIn: { "@type": "Country", name: "Denmark" } },
    { "@type": "City", name: "New York", containedIn: { "@type": "Country", name: "United States" } },
    { "@type": "City", name: "Tokyo", containedIn: { "@type": "Country", name: "Japan" } },
    { "@type": "City", name: "Seoul", containedIn: { "@type": "Country", name: "South Korea" } },
  ],
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior Design Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Interior Design", description: "Interior design services for commercial spaces" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Interior Design", description: "Workspace and office interior design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retail Interior Design", description: "Retail space and showroom design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Restaurant Interior Design", description: "Restaurant and hospitality interior design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spatial Design", description: "Spatial strategy and architectural design services" } },
    ],
  },
  knowsAbout: [
    "Interior Design",
    "Commercial Interior Design",
    "Office Design",
    "Retail Design",
    "Restaurant Design",
    "Hospitality Design",
    "Architecture",
    "Spatial Design",
    "Installation Art",
    "Brand Environments",
  ],
};

export const metadata = {
  title: "&& - Copenhagen & New York Architecture Studio",
  description: "Interior design firm based in Copenhagen and New York. && creates transformative commercial interiors, offices, retail spaces, restaurants, and hospitality environments.",
  keywords: "interior design firm, copenhagen interior firm, new york interior firm, tokyo interior design, seoul interior design, commercial interior design, architecture firm, brand environments",
  metadataBase: new URL("https://andand.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://andand.space/",
    title: "&& - Copenhagen & New York Architecture Studio",
    description: "Interior design firm based in Copenhagen and New York. We create transformative commercial interiors, offices, retail, restaurants, and hospitality environments.",
    siteName: "&&",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "&& - Copenhagen & New York Architecture Studio",
    description: "Interior design firm based in Copenhagen and New York. We create transformative commercial interiors worldwide.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TYFLNVGF2R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TYFLNVGF2R');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
