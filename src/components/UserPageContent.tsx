'use client';

import Image from 'next/image';
import Link from 'next/link';
import UserPageClient from '@/components/UserPageClient';
import { User, Item } from '@prisma/client';

type UserWithItems = User & {
  items: Item[];
};

type UserPageContentProps = {
  user: UserWithItems;
  isOwner: boolean;
};

export default function UserPageContent({ user, isOwner }: UserPageContentProps) {
  return (
    <div style={{ backgroundColor: '#FF6D0C', minHeight: '100vh', padding: '5rem 0', fontFamily: 'var(--font-rock-salt)', position: 'relative' }}>
      <div className="logo-container">
        <Image src="/logo.png" alt="MyFaves3 Logo" width={150} height={150} />
      </div>
      {!isOwner && (
        <div className="create-my-page-button-container">
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
        <div className="text-center mb-5 title-container">
          <h1>
            MyFaves3
          </h1>
        </div>
        <UserPageClient user={user} isOwner={isOwner} />
      </div>
      <style jsx>{`
        .logo-container {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        .create-my-page-button-container {
          position: absolute;
          top: 90px;
          right: 20px;
          z-index: 10;
        }
        .title-container h1 {
          font-size: 3rem;
        }

        @media (max-width: 768px) {
          .logo-container {
            left: 20px;
            top: 10px;
          }
          .logo-container :global(img) {
            width: 100px !important;
            height: 100px !important;
          }
          .title-container {
            position: absolute;
            top: 120px; /* Under the logo */
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center !important;
          }
          .title-container h1 {
            font-size: 2.5rem;
          }
          .create-my-page-button-container {
            top: 120px;
          }
        }
      `}</style>
    </div>
  );
}
