import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
