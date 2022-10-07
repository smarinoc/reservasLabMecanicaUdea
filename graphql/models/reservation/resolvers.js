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
    diary: async (parent) =>
      await prisma.diary.findUnique({
        where: {
          id: parent.diaryId,
        },
      }),
  },
  Query: {
    getReservations: async () => await prisma.reservation.findMany(),
    getReservationsByUser: async (parent, args) =>
      await prisma.reservation.findMany({
        where: {
          userId: args.userId,
          state: 'reservada',
        },
        include: {
          user: {
            include: {
              profile: {
                select: {
                  document: true,
                },
              },
            },
          },
          schedule: {
            select: {
              hour: true,
            },
          },
          machineUnit: {
            include: {
              machine: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      }),
    getReservationInfo: async () => {
      const resData = await prisma.reservation.findMany({
        select: {
          date: true,
          state: true,
          schedule: {
            select: {
              hour: true,
            },
          },
          user: {
            select: {
              profile: {
                select: {
                  document: true,
                },
              },
            },
          },
          machineUnit: {
            select: {
              serial: true,
              machine: {
                select: {
                  name: true,
                },
              },
            },
          },
          Diary: {
            select: {
              name: true,
            },
          },
        },
      });

      const res = resData.map((item) => ({
        userDocument: item.user.profile?.document || '',
        state: item.state,
        hour: item.schedule.hour,
        date: item.date,
        serial: item.machineUnit.serial,
        machineName: item.machineUnit.machine.name,
        diary: item.diary.name,
      }));

      return res;
    },
  },
  Mutation: {
    createReservation: async (parent, args) => {
      let res;
      const countReservationUser = await prisma.reservation.count({
        where: {
          userId: args.reservation.userId,
          state: 'reservada',
        },
      });
      if (countReservationUser < 1) {
        const machineUnitOnSchedule =
          await prisma.machineUnitOnSchedule.findFirst({
            where: {
              scheduleId: args.reservation.scheduleId,
              machineUnitId: args.reservation.machineUnitId,
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
                  id: args.reservation.machineUnitId,
                },
              },
              schedule: {
                connect: {
                  id: args.reservation.scheduleId,
                },
              },
              date: args.reservation.date,
              diaryId: args.reservation.diaryId,
            },
          });

          await prisma.machineUnitOnSchedule.update({
            where: {
              id: machineUnitOnSchedule.id,
            },
            data: {
              state: {
                set: 'busy',
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
    cancelReservation: async (parent, args) => {
      await prisma.machineUnitOnSchedule.updateMany({
        where: {
          scheduleId: args.reservation.scheduleId,
          machineUnitId: args.reservation.machineUnitId,
          state: 'reservada',
        },
        data: {
          state: {
            set: 'available',
          },
        },
      });
      return await prisma.reservation.update({
        where: {
          id: args.reservation.id,
        },
        data: {
          state: {
            set: 'cancelada',
          },
        },
      });
    },
  },
};

export { ReservationResolvers };
