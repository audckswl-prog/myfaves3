import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return new NextResponse(JSON.stringify({ message: 'No file found' }), {
      status: 400,
    });
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    
    // The frontend expects an object with a `url` property.
    return NextResponse.json({ url: blob.url });

  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to upload file' }),
      {
        status: 500,
      }
    );
  }
}