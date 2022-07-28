import prisma from "config/prisma";


const UserResolvers = {
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      }),
  },
  Mutation: {
    createProfiles: async (parent, args) => {
      await prisma.profile.createMany({
        data: [...args.data],
      }
      )
      return true
    },
    registerUser:  async (parent, args) => 
      await prisma.profile.update({
        where: {
          email: args.data.email
        },
        data: {
          documentType: args.data.documentType,
          document:  args.data.document,
          rol: args.data.rol,
          phoneNumber: args.data.phoneNumber,
          state: "registered",
          user: {
            connect: {
              email: args.data.email
            }
          }
        }
      })
    
  },
};

export { UserResolvers };
