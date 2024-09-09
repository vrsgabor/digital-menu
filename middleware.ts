import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';

export function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname); // Log when the middleware is triggered
  try {
    const cookies = req.headers.get('cookie') || '';
    const parsedCookies = cookie.parse(cookies);
    
    console.log('Parsed cookies:', parsedCookies); // Log the parsed cookies

    const { token } = parsedCookies;

    const protectedPaths = ['/Etterem', '/Etlap', '/Qrcode', '/Account', '/foglalasok', '/elofizetesek'];

    if (protectedPaths.includes(req.nextUrl.pathname) && !token) {
      console.log('No token found, redirecting to login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.next();
  }
}


export const config = {
  matcher: ['/Etterem', '/Etlap', '/Qrcode', '/Account', '/foglalasok', '/elofizetesek'],
};
