/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/file/**"
      },
      {
        protocol: "http",
        hostname: "42.96.13.119"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "api.scanvirus.me",
        pathname: "/minio/file/**"
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev"
      }
    ]
  }
};

export default nextConfig;
