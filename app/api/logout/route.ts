import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  return NextResponse.json({ message: 'Logged out successfully' }, {
    headers: {
      'Set-Cookie': cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1,
        sameSite: 'strict',
        path: '/',
      }),
    },
  });
}
