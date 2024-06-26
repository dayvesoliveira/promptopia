/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, not work
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  // and the following to enable top-level await support for Webpack
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
