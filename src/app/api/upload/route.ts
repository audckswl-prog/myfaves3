import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return new NextResponse(JSON.stringify({ message: 'No file found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const filename = `${Date.now()}-${file.name}`;
    const uploadsPath = path.join(process.cwd(), 'public/uploads');
    const filepath = path.join(uploadsPath, filename);

    // Ensure the uploads directory exists
    await require('fs').promises.mkdir(uploadsPath, { recursive: true });

    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    return new NextResponse(JSON.stringify({ url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to upload file' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
