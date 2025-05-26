/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Tắt tối ưu CSS, bao gồm preload
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'http',
        hostname: 'api.scanvirus.me',
        port: '9000',
        pathname: '/file/**',
      },
      {
        protocol: 'https',
        hostname: 'api.scanvirus.me',
        pathname: '/minio/file/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  generateEtags: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;