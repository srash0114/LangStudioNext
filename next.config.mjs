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
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Tạm thời giữ 'unsafe-eval' nếu cần cho thư viện bên thứ 3, nhưng nên loại bỏ nếu có thể
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline'",
              // Đảm bảo img-src bao gồm tất cả các nguồn hình ảnh
              "img-src 'self' data: https://cdn.sanity.io https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev http://api.scanvirus.me:9000",
              // Thêm connect-src nếu ứng dụng gọi API bên ngoài
              "connect-src 'self' http://api.scanvirus.me:9000 https://api.scanvirus.me",
              // Thêm frame-src nếu nhúng YouTube hoặc các iframe khác
              "frame-src 'self' https://www.youtube.com https://www.google.com",
              "frame-ancestors 'none'",
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
    config.resolve.fallback = { fs: false, net: false, tls: false }; // Tránh lỗi khi build
    return config;
  },
};

export default nextConfig;