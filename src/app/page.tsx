import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// This is the new "Lobby" page.
export default async function LobbyPage() {
  const session = await getServerSession(authOptions);

  // If the user is already logged in, redirect them straight to their dashboard.
  if (session) {
    redirect('/dashboard');
  }

  // If the user is not logged in, show them the lobby/login page.
  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-center" style={{ marginTop: '-50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src="/logo.png" alt="MyFaves3 Logo" width={300} height={300} style={{ maxWidth: '100%', height: 'auto', marginLeft: '-10px' }} />
        </div>
        <h1 className="mt-4" style={{ fontWeight: '100' }}>Welcome to MyFaves3</h1>
        <p className="lead" style={{ fontSize: '1rem', padding: '0 20px' }}>Share your faves</p>
        <hr className="my-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.5)' }} />
        <Link
          href="/api/auth/signin"
          style={{
            fontWeight: '300',
            backgroundColor: '#FF6D0C',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          LOGIN
        </Link>
      </div>
    </div>
  );
}
