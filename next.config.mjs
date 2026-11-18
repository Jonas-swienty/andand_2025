// Sent with every page and file.
const securityHeaders = [
  // Don't let other sites show this site inside a frame (clickjacking).
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  // Browsers must trust the declared file type and not guess it.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Other sites only learn "andand.space", never the full page address.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site never needs the camera, microphone or location.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Photos are resized per screen and served as AVIF/WebP by Vercel.
    formats: ["image/avif", "image/webp"],
    // Photo quality (Next.js's default is 75, a bit soft for photography). Must match QUALITY in HomeClient.js.
    qualities: [85],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Media URLs carry a ?v=<content hash> so long caching never serves an old photo.
    localPatterns: [{ pathname: "/media/**" }, { pathname: "/images/**" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
