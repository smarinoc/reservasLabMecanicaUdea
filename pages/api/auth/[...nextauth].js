import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const checkEmail = async (email) => {
  console.log(email)
  const profile = await prisma.profile.findUnique({
    where: {
      email: email
    }
  })
  if(profile){
    if(profile.state==="authorized"){
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
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],
})