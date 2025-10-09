import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { name, goodPoints, imageUrl, link } = body;

  if (!name || !goodPoints || !imageUrl || !link) {
    return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(link)) {
    return new NextResponse(JSON.stringify({ message: 'Invalid link URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (goodPoints && goodPoints.length > 500) {
    return new NextResponse(JSON.stringify({ message: 'Good points cannot exceed 500 characters.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!name) {
    return new NextResponse(JSON.stringify({ message: 'Name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        goodPoints,
        imageUrl,
        link,
        userId: user.id,
      },
    });
    return new NextResponse(JSON.stringify(newItem), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating item:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to create item' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
