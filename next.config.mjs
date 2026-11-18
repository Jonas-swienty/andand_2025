/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Photos are resized per screen and served as AVIF/WebP by Vercel.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Media URLs carry a ?v=<content hash> so long caching never serves an old photo.
    localPatterns: [{ pathname: "/media/**" }, { pathname: "/images/**" }],
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
