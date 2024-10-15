import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the meals.json file
const filePath = path.join(process.cwd(), 'public', 'meals.json');

// Fetch meals from the JSON file (GET request)
export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(data), { status: 200 });
  } catch (error) {
    console.error("Error reading meals file:", error);
    return NextResponse.json({ message: 'Error reading meals file' }, { status: 500 });
  }
}

// Update the meals.json file (POST request)
export async function POST(req) {
  try {
    const mealsData = await req.json();

    // Write the updated meals data to the meals.json file
    fs.writeFileSync(filePath, JSON.stringify({ meals: mealsData }, null, 2));

    return NextResponse.json({ message: 'Meals updated successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating meals file:", error);
    return NextResponse.json({ message: 'Error updating meals file' }, { status: 500 });
  }
}
