import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["openweathermap.org"],
  },
  theme: {
    extend: {
      colors: {
        peach: "#fba178",
      },
    },
  },
};

export default nextConfig;
