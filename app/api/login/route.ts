import { findUser, validatePassword } from '../../../lib/users';
import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Felhasználónév és jelszó mező kitöltése kötelező!' }, { status: 400 });
  }

  const user = await findUser(username);

  if (!user) {
    console.log('Login failed: User not found for username:', username); // Log when user is not found
    return NextResponse.json({ message: 'Nem található fiók a megadott felhasználóval.' }, { status: 401 });
  }

  console.log('User logging in:', user); // Log the user object after it is retrieved from memory

  const isValidPassword = await validatePassword(user, password); // Validate the password

  console.log('Password validation result:', isValidPassword); // Log the result of the password validation

  if (!isValidPassword) {
    console.log('Login failed: Incorrect password for user:', username); // Log when password is incorrect
    return NextResponse.json({ message: 'Helytelen jelszó. Próbálja újból!' }, { status: 401 });
  }

  console.log('Login successful for user:', user.username); // Log when the login is successful

  // Set a cookie to simulate a session
  return NextResponse.json({ username: user.username }, {
    status: 200,
    headers: {
      'Set-Cookie': cookie.serialize('token', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
      }),
    },
  });
}
