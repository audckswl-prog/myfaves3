import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';
import { Inter, Lato, Rock_Salt, Merienda, Noto_Sans_KR } from 'next/font/google';
import { NextAuthProvider } from '@/components/NextAuthProvider';

import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'], // Thin, Light, Regular, Bold
  variable: '--font-lato', // Define as CSS variable
});

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: '400', 
  variable: '--font-rock-salt',
});

const merienda = Merienda({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-merienda',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: '100',
  variable: '--font-noto-sans-kr',
});



export const metadata: Metadata = {
  title: 'MyFaves3',
  description: 'Showcase your favorite items to the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${lato.variable} ${rockSalt.variable} ${merienda.variable} ${notoSansKr.variable}`}> {/* Apply font variable */}
        <NextAuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
