'use client';

import { usePathname } from 'next/navigation';
import AuthNav from './AuthNav';

export default function AuthNavWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return null; // Don't render AuthNav on the home page
  }

  return <AuthNav />;
}
