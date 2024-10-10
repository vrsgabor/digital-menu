import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const restaurantInfo = await req.json();

    // Define the path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'restaurantInfo.json');

    // Write the updated restaurant info to the file
    fs.writeFileSync(filePath, JSON.stringify(restaurantInfo, null, 2));

    return NextResponse.json({ message: 'Restaurant info saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving restaurant info:', error);
    return NextResponse.json({ message: 'Failed to save restaurant info' }, { status: 500 });
  }
}
