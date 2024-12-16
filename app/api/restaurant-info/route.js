import sql from 'mssql';

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST, // Example: 'localhost' or 'VRSGABOR'
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10), // 1433
    options: {
      encrypt: false, // Set to false if encryption isn't configured
      trustServerCertificate: true, // For self-signed certificates
    },
  };
  

// Named export for the GET method
export async function GET() {
  try {
    // Connect to the database
    const pool = await sql.connect(dbConfig);

    // Query to get restaurant info
    const result = await pool
      .request()
      .query('SELECT name AS restaurantName, address AS restaurantAddress FROM Restaurants');

    if (result.recordset.length > 0) {
      return Response.json(result.recordset[0], { status: 200 });
    } else {
      return Response.json({ message: 'No restaurant data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Database query error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
