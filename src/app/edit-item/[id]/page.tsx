import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import EditItemForm from '@/components/EditItemForm';
import Link from 'next/link';

type EditItemPageProps = {
  params: {
    id: string;
  };
};

export default async function EditItemPage({ params }: EditItemPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const item = await prisma.item.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!item) {
    return <div>Item not found</div>;
  }

  // Ensure that the user editing the item is the owner of the item.
  // This is a security measure.
  // @ts-ignore
  if (item.userId !== session.user.id) {
    return <div>You are not authorized to edit this item.</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontFamily: 'var(--font-rock-salt)' }}>Edit Item</h1>
        <Link href="/dashboard" className="btn btn-secondary">
          Back
        </Link>
      </div>
      <EditItemForm item={item} />
    </div>
  );
}