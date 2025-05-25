/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist', // Thư mục build là 'dist'
  // output: 'export', // Xuất nội dung tĩnh cho GitHub Pages
  images: {
    // unoptimized: true, // Vô hiệu hóa tối ưu hóa hình ảnh để tương thích với GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "9000",
      //   pathname: "/file/**"
      // },
      // {
      //   protocol: "http",
      //   hostname: "42.96.13.119"
      // },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "http",
        hostname: "api.scanvirus.me",
        port: "9000",
        pathname: "/file/**"
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev"
      }
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.sanity.io https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev https://api.scanvirus.me; frame-ancestors 'none';",
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
        ],
      },
    ];
  },
  
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }; // Tránh lỗi khi build static export
    return config;
  },
};

export default nextConfig;
