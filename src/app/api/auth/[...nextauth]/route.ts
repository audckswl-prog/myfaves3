import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/db';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // Append a few random chars from the unique sub to avoid username collisions
        const username = `${profile.email.split('@')[0]}-${profile.sub.slice(0, 5)}`;
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: username,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, add custom properties to the token
      if (user) {
        // @ts-ignore
        token.username = user.username;
        // @ts-ignore
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties to the session object
      if (session.user) {
        // @ts-ignore
        session.user.username = token.username;
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };