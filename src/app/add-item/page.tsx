import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AddItemForm from '@/components/AddItemForm';
import Link from 'next/link';

export default async function AddItemPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontFamily: 'var(--font-rock-salt)' }}>Add New Item</h1>
        <Link href="/dashboard" className="btn btn-secondary">
          Back
        </Link>
      </div>
      <AddItemForm />
    </div>
  );
}
