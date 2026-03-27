/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "people.pic1.co" },
      { protocol: "https", hostname: "app-uploads-cdn.fera.ai" },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/__ecom/:path*",
        destination: "https://store.watchfusionkenya.com/__ecom/:path*",
        permanent: false,
      },
      {
        source: "/_api/:path*",
        destination: "https://store.watchfusionkenya.com/_api/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;