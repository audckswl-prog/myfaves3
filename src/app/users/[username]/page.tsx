import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserPageClient from '@/components/UserPageClient';
import UserPageContent from '@/components/UserPageContent';

export const dynamic = 'force-dynamic';

type UserPageProps = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    include: {
      items: true,
    },
  });

  if (!user) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  // Check if the logged-in user is the owner of this page
  const isOwner = session?.user?.username === user.username;

  return <UserPageContent user={user} isOwner={isOwner} />;
}