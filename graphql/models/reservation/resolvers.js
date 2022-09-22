/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');

const ReservationResolvers = {
  Reservation: {
    user: async (parent) =>
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
    schedule: async (parent) =>
      await prisma.schedule.findUnique({
        where: {
          id: parent.scheduleId,
        },
      }),
    machineUnit: async (parent) =>
      await prisma.machineUnit.findUnique({
        where: {
          id: parent.machineUnitId,
        },
      }),
  },
  Query: {
    getReservations: async () => await prisma.reservation.findMany(),
  },
  Mutation: {
    createReservation: async (parent, args) => {
      let res;
      const countReservationUser = await prisma.reservation.count({
        where: {
          userId: args.reservation.userId,
          state: 'reserved',
        },
      });
      if (countReservationUser < 1) {
        const machineUnitOnSchedule =
          await prisma.machineUnitOnSchedule.findFirst({
            where: {
              schedule: {
                day: args.reservation.day,
                hour: args.reservation.hour,
              },
              machineUnitId: args.reservation.machineUnitID,
              state: 'available',
            },
          });

        if (machineUnitOnSchedule) {
          res = await prisma.reservation.create({
            data: {
              user: {
                connect: {
                  id: args.reservation.userId,
                },
              },
              machineUnit: {
                connect: {
                  id: args.reservation.machineUnitID,
                },
              },
              schedule: {
                connect: {
                  id: args.reservation.scheduleId,
                },
              },
              date: args.reservation.date,
            },
          });

          await prisma.machineUnitOnSchedule.update({
            where: {
              id: machineUnitOnSchedule.id,
            },
            data: {
              state: {
                set: 'reserved',
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

export { ReservationResolvers };
