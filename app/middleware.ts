import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';

export function middleware(req: NextRequest) {
  const cookies = req.headers.get('cookie');
  const { token } = cookie.parse(cookies || '');
  const pathname = req.nextUrl.pathname;

  // List of paths that should be accessible without authentication
  const unprotectedPaths = ['/', '/login', '/signup'];

  // If the path is unprotected, allow access
  if (unprotectedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Etlap/:path*', '/Etterem/:path*', '/Qrcode/:path*', '/Account/:path*'],
};
