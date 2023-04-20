/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cls-cdn-wip.sgp1.cdn.digitaloceanspaces.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
