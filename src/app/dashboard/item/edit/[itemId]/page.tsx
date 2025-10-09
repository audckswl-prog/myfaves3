import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/db';
import EditItemForm from '@/components/EditItemForm';

type EditItemPageProps = {
  params: {
    itemId: string;
  };
};

export default async function EditItemPage({ params }: EditItemPageProps) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect('/api/auth/signin');
  }

  const { itemId } = params;
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // Verify ownership
  if (!user || item.userId !== user.id) {
    return (
      <div className="container my-5">
        <h1>Forbidden</h1>
        <p>You do not have permission to edit this item.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Edit: {item.name}</h1>
      <EditItemForm item={item} />
    </div>
  );
}
