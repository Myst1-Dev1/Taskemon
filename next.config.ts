// next.config.ts
import withPWA from "next-pwa";

const withPWAFunc = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig:any = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};

export default withPWAFunc(nextConfig);