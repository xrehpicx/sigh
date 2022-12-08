/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/minio/:path*",
          destination:
            process.env.NODE_ENV === "development"
              ? "http://localhost:9001/:path*"
              : "http://minio:9001/:path*",
        },
      ],
    };
  },
  // experimental: { appDir: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
