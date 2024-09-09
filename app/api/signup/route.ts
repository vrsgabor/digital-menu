import { createUser, findUser } from '../../../lib/users';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Felhasználónév és jelszó mező kitöltése kötelező!' }, { status: 400 });
  }

  const existingUser = await findUser(username);

  if (existingUser) {
    console.log('Signup attempt with existing user:', username); // Log for duplicate signup
    return NextResponse.json({ message: 'Ezzel a felhasználóval már létezik fiók.' }, { status: 409 });
  }

  const user = await createUser(username, password);

  console.log('User signed up:', user); // Log the user object after signup

  return NextResponse.json({ username: user.username }, { status: 201 });
}
