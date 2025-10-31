import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.paninieight.com", // keep your CDN too
      },
    ],
  },

  // async redirects() {
  //   return [
  //     { source: "/auth/sign-in", destination: "/sign-in", permanent: true },
  //     { source: "/auth/sign-up", destination: "/sign-up", permanent: true },
  //     { source: "/auth/otp", destination: "/otp", permanent: true },
  //   ];
  // },
};

export default nextConfig;
