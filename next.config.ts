import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives under the user profile, where an unrelated lockfile sits
  // higher up. Pin the tracing root so builds do not walk out of the project.
  outputFileTracingRoot: path.resolve(),
  images: {
    formats: ["image/avif", "image/webp"],
    // Every quality value used with next/image must be declared here.
    qualities: [72, 74, 78, 80, 82],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
