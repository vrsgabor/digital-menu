import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Path to the file where users will be stored
const usersFilePath = path.join(process.cwd(), 'users.json');

// Helper function to read users from the file
function readUsers() {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(fileContents);
}

// Helper function to write users to the file
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

// Function to create a new user
export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const user = { username, password: hashedPassword };
  
  const users = readUsers(); // Read users from the file
  users.push(user); // Add the new user
  writeUsers(users); // Save the updated users to the file
  
  console.log('User created (hashed):', user); // Debug log to check if the user is stored with hashed password
  return user;
}

// Function to find a user by username
export async function findUser(username) {
  const users = readUsers(); // Read users from the file
  const foundUser = users.find(user => user.username === username);
  console.log('User found:', foundUser); // Debug log to check if the user is retrieved correctly
  return foundUser;
}

// Function to validate the password
export async function validatePassword(user, inputPassword) {
  const isValid = await bcrypt.compare(inputPassword, user.password); // Compare the password with the hash
  console.log('Password validation result for user:', user.username, isValid); // Debug log for password comparison result
  return isValid;
}