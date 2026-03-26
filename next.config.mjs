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
        destination: "https://469ac00d-9631-4a9d-b69b-9b0c047b99cf.wixsite.com/_api/:path*",
      },
      {
        source: "/__ecom/:path*",
        destination: "https://469ac00d-9631-4a9d-b69b-9b0c047b99cf.wixsite.com/__ecom/:path*",
      },
      {
        source: "/_partials/:path*",
        destination: "https://469ac00d-9631-4a9d-b69b-9b0c047b99cf.wixsite.com/_partials/:path*",
      },
      {
        source: "/_serverless/:path*",
        destination: "https://469ac00d-9631-4a9d-b69b-9b0c047b99cf.wixsite.com/_serverless/:path*",
      },
    ];
  },
};

export default nextConfig;