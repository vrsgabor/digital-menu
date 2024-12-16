import { createUser, findUser } from '../../../lib/users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Felhasználónév és jelszó mező kitöltése kötelező!' },
        { status: 400 }
      );
    }

    const existingUser = await findUser(username);

    if (existingUser) {
      console.log('Signup attempt with existing user:', username);
      return NextResponse.json(
        { message: 'Ezzel a felhasználóval már létezik fiók.' },
        { status: 409 }
      );
    }

    const user = await createUser(username, password);

    console.log('User signed up:', user);
    return NextResponse.json({ username: user.username }, { status: 201 });
  } catch (error) {
    console.error('Error in signup API:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
