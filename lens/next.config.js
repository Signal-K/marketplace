/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lens.infura-ipfs.io", "picsum.photos"],
    remotePatterns: [
      {
        protocol: "ipfs",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;