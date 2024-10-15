import { promises as fs } from 'fs';
import path from 'path';

// Handle GET and POST requests
export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'planStatus.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response('Failed to read the plan status', { status: 500 });
  }
}

export async function POST(req) {
  const filePath = path.join(process.cwd(), 'public', 'planStatus.json');
  try {
    const { currentPlan } = await req.json();
    const updatedPlan = { currentPlan };

    await fs.writeFile(filePath, JSON.stringify(updatedPlan));
    return new Response(JSON.stringify(updatedPlan), { status: 200 });
  } catch (error) {
    return new Response('Failed to update the plan status', { status: 500 });
  }
}
