/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist', // Thư mục build là 'dist'
  // output: 'export', // Xuất nội dung tĩnh cho GitHub Pages
  images: {
    unoptimized: true, // Vô hiệu hóa tối ưu hóa hình ảnh để tương thích với GitHub Pages
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
  }
};

export default nextConfig;
