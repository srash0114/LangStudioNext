// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;

  if (!authToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    // Xác minh JWT trực tiếp
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET || 'your-secret-key');
    // request.user = decoded; // Gắn thông tin user vào request để sử dụng ở các route khác
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/user/:path*'],
};