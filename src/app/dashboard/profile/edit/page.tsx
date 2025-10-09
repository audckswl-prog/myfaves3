import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import EditProfileForm from '@/components/EditProfileForm';

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Edit Profile</h1>
      <EditProfileForm user={user} />
    </div>
  );
}
