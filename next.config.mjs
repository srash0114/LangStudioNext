/** @type {import('next').NextConfig} */
const nextConfig = {
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
  generateEtags: false, // Tắt ETag để tránh lộ timestamp
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' https://www.youtube.com https://www.google.com https://apis.google.com", // Loại bỏ 'unsafe-inline' và 'unsafe-eval'
              "style-src 'self'", // Đã loại bỏ 'unsafe-inline'
              "img-src 'self' data: https://cdn.sanity.io https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev https://api.scanvirus.me https://img.youtube.com",
              "connect-src 'self' http://api.scanvirus.me:9000 https://api.scanvirus.me",
              "frame-src 'self' https://www.youtube.com https://www.google.com",
              "frame-ancestors 'none'",
              "worker-src 'self'",
              "font-src 'self' data:",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;