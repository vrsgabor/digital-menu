import { findUser, validatePassword } from '../../../lib/users';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Import the Next.js request type
import cookie from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Mezők kitöltése kötelező!' }, { status: 400 });
    }

    const user = await findUser(username);

    if (!user) {
      console.log('Login failed: User not found for username:', username);
      return NextResponse.json({ message: 'Nem található a megadott adatokkal felhasználó!' }, { status: 401 });
    }

    const isValidPassword = await validatePassword(user, password);

    if (!isValidPassword) {
      console.log('Login failed: Incorrect password for user:', username);
      return NextResponse.json({ message: 'Helytelen jelszó. Próbálja újra!' }, { status: 401 });
    }

    console.log('Login successful for user:', user.username);

    // Set a cookie to simulate a session
    return NextResponse.json({ username: user.username }, {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize('token', username, {
          httpOnly: true, // Ensures the cookie is not accessible by JavaScript
          secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        }),
      },
    });
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
