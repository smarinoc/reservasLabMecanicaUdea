import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkEmail = async (email) => {
  const profile = await prisma.profile.findUnique({
    where: {
      email,
    },
  });
  if (profile) {
    if (profile.state === 'habilitado' || profile.state === 'registrado') {
      return true;
    }
  }
  return false;
};

export default NextAuth({
  callbacks: {
    async signIn({ profile }) {
      return profile.email_verified && checkEmail(profile.email);
    },
    async session({ user }) {

      const profile=await prisma.profile.findUnique({
        where: {
          email: user.email
        }
      })

      let modifiedSession = await prisma.session.findFirst({
        where: {
          userId: user.id,
        }, 
        include: {
          user: true
      }});

      modifiedSession = {
        ...modifiedSession,
          profile: profile
        }
      return modifiedSession;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
