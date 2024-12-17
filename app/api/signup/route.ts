import { createUser, findUser } from '../../../lib/users';
import { NextResponse } from 'next/server';
import sql from 'mssql'

const config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  options: { trustServerCertificate: true },
};

// Define request body type
interface SignupRequestBody {
  username: string;
  password: string;
}

// Define response data
interface SignupResponseData {
  username: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Parse request body
    const { username, password }: SignupRequestBody = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Felhasználónév és jelszó mező kitöltése kötelező!' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await findUser(username);
    if (existingUser) {
      console.log('Signup attempt with existing user:', username);
      return NextResponse.json(
        { message: 'Ezzel a felhasználóval már létezik fiók.' },
        { status: 409 }
      );
    }

    // Create the user and retrieve their ID
    const user = await createUser(username, password);
    if (!user || !user.id) {
      return NextResponse.json(
        { message: 'Failed to create user.' },
        { status: 500 }
      );
    }

    // Assign default 'Alap' plan
    const pool = await sql.connect(config);
    await pool
      .request()
      .input('user_id', sql.Int, user.id)
      .input('plan', sql.NVarChar, 'Alap')
      .query(`
        INSERT INTO dbo.Subscriptions (user_id, [plan], subscribed_at)
        VALUES (@user_id, @plan, GETDATE());
      `);

    const responseData: SignupResponseData = { username: user.username };

    console.log('User signed up and default plan assigned:', user.username);
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Error in signup API:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
