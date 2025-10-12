import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string) => {
        // This logic runs on the server.
        // You can add your own logic here, e.g. for authorization.
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on completion
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This logic runs on the server.
        // Use `blob` to store metadata in your database.
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
