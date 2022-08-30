/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');

const ReserveResolvers = {
  Reserve: {
    machineUnitOnSchedule: async (parent) =>
      await prisma.machineUnitOnSchedule.findUnique({
        where: {
          id: parent.machineUnitOnScheduleId,
        },
      }),
    user: async (parent) =>
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
  },
  Query: {
    getReserves: async () => await prisma.reserve.findMany(),
  },
  Mutation: {
    createReserve: async (parent, args) => {
      const machineUnitOnScheduleId =
        await prisma.machineUnitOnSchedule.findFirst({
          where: {
            schedule: {
              day: args.reserve.day,
              hour: args.reserve.hour,
            },
            machineUnitId: args.reserve.machineUnitID,
          },
          select: {
            id: true,
          },
        });
      const res = await prisma.reserve.create({
        data: {
          userId: args.reserve.userId,
          machineUnitOnScheduleId: machineUnitOnScheduleId.id
        },
      });

      await prisma.machineUnitOnSchedule.update({
        where: {
          id: machineUnitOnScheduleId.id,
        },
        data: {
          countAvailable: {
            decrement: 1,
          },
        },
      });
      return res;
    },
  },
};

export { ReserveResolvers };
