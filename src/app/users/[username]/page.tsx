import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserPageClient from '@/components/UserPageClient';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <div style={{ backgroundColor: '#FF6D0C', minHeight: '100vh', padding: '5rem 0', fontFamily: 'var(--font-rock-salt)', position: 'relative' }}>

      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
        <Image src="/logo.png" alt="MyFaves3 Logo" width={150} height={150} />
      </div>
      {!isOwner && (
        <div style={{ position: 'absolute', top: '90px', right: '20px', zIndex: 10 }}>
          <Link
            href="/"
            style={{
              backgroundColor: 'transparent',
              border: '2px solid white',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '60% 40% 30% 70% / 70% 30% 70% 30%',
              fontFamily: 'var(--font-rock-salt)',
              cursor: 'pointer',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Create my page
          </Link>
        </div>
      )}
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '3rem' }}>
            MyFaves3
          </h1>
        </div>
        <UserPageClient user={user} isOwner={isOwner} />
      </div>
    </div>
  );
}