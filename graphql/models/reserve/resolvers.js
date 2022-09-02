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
      let res;
      const countReserveUser = await prisma.reserve.count({
        where: {
          userId: args.reserve.userId,
          state: 'Reserved',
        },
      });
      if (countReserveUser < 1) {
        const machineUnitOnSchedule =
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
              countAvailable: true,
            },
          });

        if (machineUnitOnSchedule.countAvailable > 0) {
          res = await prisma.reserve.create({
            data: {
              userId: args.reserve.userId,
              machineUnitOnScheduleId: machineUnitOnSchedule.id,
            },
          });

          await prisma.machineUnitOnSchedule.update({
            where: {
              id: machineUnitOnSchedule.id,
            },
            data: {
              countAvailable: {
                decrement: 1,
              },
            },
          });
        } else {
          res = {
            id: '-2',
          };
        }
      } else {
        res = {
          id: '-1',
        };
      }

      return res;
    },
  },
};

export { ReserveResolvers };
