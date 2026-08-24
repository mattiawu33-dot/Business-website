import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder catalog art ships as local SVGs until real photography
    // replaces it (see scripts/generate-placeholder-images.mjs).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
