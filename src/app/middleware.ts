import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
  const nonce = uuidv4();
  const origin = request.headers.get('origin');
  const allowedOrigins = ['https://lang-studio-next.vercel.app'];

  const response = NextResponse.next({
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' https://www.youtube.com https://www.google.com https://apis.google.com`,
        "style-src 'self'",
        "img-src 'self' data: https://cdn.sanity.io https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev https://api.scanvirus.me https://img.youtube.com",
        "connect-src 'self' http://api.scanvirus.me:9000 https://api.scanvirus.me",
        "frame-src 'self' https://www.youtube.com https://www.google.com",
        "frame-ancestors 'none'",
        "worker-src 'self'",
        "font-src 'self' data:",
      ].join('; '),
      'X-Frame-Options': 'DENY',
    },
  });

  // Explicit CORS handling
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    response.headers.delete('Access-Control-Allow-Origin');
    response.headers.delete('Access-Control-Allow-Methods');
    response.headers.delete('Access-Control-Allow-Headers');
  }

  response.headers.set('X-Nonce', nonce);
  return response;
}

export const config = {
  matcher: ['/((?!_next|_api|_static|_image|favicon.ico).*)'], // Match all routes except Next.js internals and static assets
};