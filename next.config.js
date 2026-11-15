/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
