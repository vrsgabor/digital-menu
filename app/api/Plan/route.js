import { NextResponse } from 'next/server';
import sql from 'mssql';
import cookie from 'cookie';


const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  options: { trustServerCertificate: true },
};

export async function POST(req) {
  try {
    const { currentPlan } = await req.json();

    // Extract username from cookie
    const cookies = req.headers.get('cookie');
    const parsedCookies = cookie.parse(cookies || '');
    const username = parsedCookies.token;

    if (!currentPlan || !username) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    // Connect to database
    const pool = await sql.connect(config);

    // Find the user ID
    const userResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT id FROM dbo.Users WHERE username = @username');

    if (userResult.recordset.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userId = userResult.recordset[0].id;

    // Upsert the subscription plan
    await pool.request()
      .input('user_id', sql.Int, userId)
      .input('plan', sql.NVarChar, currentPlan)
      .query(`IF EXISTS (SELECT 1 FROM dbo.Subscriptions WHERE user_id = @user_id)
      UPDATE dbo.Subscriptions SET [plan] = @plan, updated_at = GETDATE() WHERE user_id = @user_id;
  ELSE
      INSERT INTO dbo.Subscriptions (user_id, [plan]) VALUES (@user_id, @plan);
  `);

    return NextResponse.json({ message: 'Subscription updated successfully', plan: currentPlan });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    const cookies = req.headers.get('cookie');
    const parsedCookies = cookie.parse(cookies || '');
    const username = parsedCookies.token;

    if (!username) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const pool = await sql.connect(config);

    // Find the user ID and subscription
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query(`
        SELECT s.[plan]
        FROM dbo.Users u
        LEFT JOIN dbo.Subscriptions s ON u.id = s.user_id
        WHERE u.username = @username;
      `);

    const plan = result.recordset[0]?.plan || 'Alap';

    return NextResponse.json({ currentPlan: plan });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
