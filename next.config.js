import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typedRoutes: true,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
