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
      const resData = await prisma.profile.findMany({
        include: {
          user: true,
        },
      });
      const res = resData.map((profile) => ({
        id: profile.user?.id || '',
        name: profile.user?.name || '',
        email: profile.email || '',
        state: profile.state,
        documentType: profile.documentType || '',
        document: profile.document || '',
        userType: profile.userType || '',
        phoneNumber: profile.phoneNumber || '',
      }));

      return res;
    },
    getUsersInfoTableAdmin: async () => {
      const resData = await prisma.profile.findMany({
        select: {
          document: true,
          email: true,
          state: true,
          id: true,
        },
      });

      const res = resData.map((item) => ({
        id: item.id,
        document: item.document || '',
        email: item.email || '',
        state: item.state || '',
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
          state: 'registrado',
          user: {
            connect: {
              email: args.data.email,
            },
          },
        },
      }),
    changeUserState: async (parent, args) => {
      await prisma.profile.update({
        where: {
          id: args.data.id,
        },
        data: {
          state: {
            set: args.data.state,
          },
        },
      });
    },
  },
};

export { UserResolvers };
