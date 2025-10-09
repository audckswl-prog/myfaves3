'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import Image from 'next/image';

export default function AuthNav() {
  const { data: session } = useSession();



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-0">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Side */}
        <Link href="/" className="navbar-brand">
          <Image src="/logo.png" alt="MyFaves3 Logo" width={50} height={50} className="d-inline-block align-top" />
        </Link>



        {/* Right Side */}
        <div className="d-flex align-items-center">
          {session?.user ? (
            <>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User image'}
                  width={40}
                  height={40}
                  className="rounded-circle me-3"
                />
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/api/auth/signin" className="btn btn-primary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}