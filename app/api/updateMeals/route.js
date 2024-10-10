import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const mealsData = await req.json();

    // Path to the meals.json file
    const filePath = path.join(process.cwd(), 'public', 'meals.json');

    // Write the updated meals data to the meals.json file
    fs.writeFileSync(filePath, JSON.stringify({ meals: mealsData }, null, 2));

    return NextResponse.json({ message: 'Meals updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating the meals file' }, { status: 500 });
  }
}
