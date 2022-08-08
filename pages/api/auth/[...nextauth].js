import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const checkEmail = async (email) => {
  const profile = await prisma.profile.findUnique({
    where: {
      email: email
    }
  })
  if(profile){
    if(profile.state==="authorized" || profile.state==="registered"){
      return true
    }
  }
  return false
}

export default NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
        return profile.email_verified && checkEmail(profile.email)
    },
    async session({ session, user, token }) {
      const modifiedSession = await prisma.session.findFirst({
        where: {
          userId: user.id
        },
        include: {
          user: {
            include: {
              profile: true
            }
          }
        }  
      })
      return modifiedSession
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],
})