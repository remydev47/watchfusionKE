/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "people.pic1.co",
      },
      {
        protocol: "https",
        hostname: "app-uploads-cdn.fera.ai",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/_api/:path*",
        destination: "https://store.watchfusionkenya.com/_api/:path*",
      },
      {
        source: "/__ecom/:path*",
        destination: "https://store.watchfusionkenya.com/__ecom/:path*",
      },
      {
        source: "/_partials/:path*",
        destination: "https://store.watchfusionkenya.com/_partials/:path*",
      },
    ];
  },
};

export default nextConfig;