import sql from 'mssql';
import bcrypt from 'bcryptjs'; // Use bcryptjs for password hashing

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Function to find a user by username
export async function findUser(username) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');
    return result.recordset[0]; // Return the first matching user or undefined
  } catch (error) {
    console.error('Error querying user:', error);
    throw new Error('Database query failed');
  }
}

// Function to create a new user
export async function createUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, hashedPassword)
      .query(
        'INSERT INTO Users (username, password_hash) OUTPUT INSERTED.* VALUES (@username, @password)'
      );

    return result.recordset[0]; // Return the inserted user
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database insert failed');
  }
}
