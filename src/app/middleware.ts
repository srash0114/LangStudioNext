import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = ['https://lang-studio-next.vercel.app'];

  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next({
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/listening/:path*'],
};