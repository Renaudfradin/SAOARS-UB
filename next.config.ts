import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  turbopack: {
    rules: {
      "*.svg": {
        type: "asset",
      },
    },
  },
  async redirects() {
    return [
      { source: "/equipements", destination: "/equipments", permanent: true },
      { source: "/equipements/:slug", destination: "/equipments/:slug", permanent: true },
      { source: "/abilitys", destination: "/abilities", permanent: true },
      { source: "/abilitys/:slug", destination: "/abilities/:slug", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/models/cube.gltf",
        destination: "https://saoub.fanadata.com/assets/aliceOI_by_ekoow.gltf",
      },
    ];
  },
};

export default nextConfig;
