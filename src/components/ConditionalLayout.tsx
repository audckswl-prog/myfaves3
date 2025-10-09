'use client';

import { usePathname } from 'next/navigation';
import AuthNavWrapper from './AuthNavWrapper';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define the paths where the nav is hidden. This includes the user landing page (e.g., /username)
  // and the user item page (e.g., /users/username).
  const pathSegments = pathname.split('/').filter(Boolean);
  const isProfilePath = pathname.startsWith('/users/') || (pathSegments.length === 1 && pathSegments[0] !== 'dashboard' && pathSegments[0] !== 'add-item' && pathSegments[0] !== 'edit-item');

  return (
    <>
      {!isProfilePath && <AuthNavWrapper />}
      <main>{children}</main>
    </>
  );
}
