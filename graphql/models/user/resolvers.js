/* eslint-disable no-return-await */
import prisma from 'config/prisma';

const UserResolvers = {
  Query: {
    getUsers: async () => await prisma.user.findMany(),
    getUser: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      }),
    getUsersInfo: async () => {
      const restData = await prisma.profile.findMany({
        include: {
          user: true,
        },
      });
      const res = restData.map((profile) => ({
        id: profile.user?.id || '',
        name: profile.user?.name || '',
        email: profile.user?.email || '',
        state: profile.state,
        documentType: profile.documentType || '',
        document: profile.document || '',
        userType: profile.userType || '',
        phoneNumber: profile.phoneNumber || '',
      }));

      return res;
    },
  },
  Mutation: {
    createProfiles: async (parent, args) => {
      await prisma.profile.createMany({
        data: [...args.data],
      });
      return true;
    },
    registerUser: async (parent, args) =>
      await prisma.profile.update({
        where: {
          email: args.data.email,
        },
        data: {
          documentType: args.data.documentType,
          document: args.data.document,
          userType: args.data.userType,
          phoneNumber: args.data.phoneNumber,
          state: 'registered',
          user: {
            connect: {
              email: args.data.email,
            },
          },
        },
      }),
  },
};

export { UserResolvers };
