import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import DashboardClient from '@/components/DashboardClient';

// This is a server-side rendered, protected page.
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to the login page.
  if (!session || !session.user?.email) {
    redirect('/api/auth/signin');
  }

  // Fetch the user from the database to get the most up-to-date info
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      items: true, // Include items to display them on the dashboard
    },
  });

  if (!user) {
    // This case should ideally not happen if the user has a session
    redirect('/api/auth/signin');
  }

  return (
    <div style={{ backgroundColor: '#FF6D0C', minHeight: '100vh', padding: '5rem 0', fontFamily: 'var(--font-rock-salt)' }}>
      <DashboardClient items={user.items} name={user.name} username={user.username} />
    </div>
  );
}
