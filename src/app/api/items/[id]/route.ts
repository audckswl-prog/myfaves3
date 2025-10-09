import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { name, imageUrl, link, goodPoints } = body;

  if (!name || !goodPoints || !imageUrl || !link) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(link)) {
    return NextResponse.json({ message: 'Invalid link URL' }, { status: 400 });
  }

  if (goodPoints && goodPoints.length > 500) {
    return NextResponse.json({ message: 'Good points cannot exceed 500 characters.' }, { status: 400 });
  }

    if (!name) {
      return NextResponse.json({ message: 'Item name is required' }, { status: 400 });
    }

    const item = await prisma.item.findUnique({
      where: { id: id },
      include: { user: true },
    });

    if (!item) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    if (item.user.email !== session.user.email) {
      return NextResponse.json({ message: 'Forbidden: You do not own this item' }, { status: 403 });
    }

    const updatedItem = await prisma.item.update({
      where: { id: id },
      data: {
        name,
        imageUrl,
        link,
        goodPoints,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;

    const item = await prisma.item.findUnique({
      where: { id: id },
      include: { user: true }, // Include user to check ownership
    });

    if (!item) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    // Check if the logged-in user is the owner of the item
    if (item.user.email !== session.user.email) {
      return NextResponse.json({ message: 'Forbidden: You do not own this item' }, { status: 403 });
    }

    await prisma.item.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
