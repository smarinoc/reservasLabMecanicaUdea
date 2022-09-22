/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');
const schedulesJson = require('res/schedules.json');

const DiaryResolvers = {
  Diary: {
    schedules: async (parent) =>
      await prisma.schedule.findMany({
        where: {
          diaries: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
    machineUnits: async (parent) =>
      await prisma.machineUnit.findMany({
        where: {
          diaryId: parent.id,
        },
      }),
  },
  Schedule: {
    machineUnitsOnSchedule: async (parent) =>
      await prisma.machineUnitOnSchedule.findMany({
        where: {
          scheduleId: parent.id,
        },
      }),
    reservations: async (parent) =>
      await prisma.reservation.findMany({
        where: {
          scheduleId: parent.id,
        },
      }),
  },
  MachineUnitOnSchedule: {
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
    getDiaries: async () => await prisma.diary.findMany(),
    getMachinesUnitBySchedule: async (parent, args) => {
      const aux = await prisma.machineUnitOnSchedule.findMany({
        where: {
          scheduleId: args.id,
          state: 'available',
        },
        include: {
          machineUnit: {
            include: {
              machine: true,
            },
          },
        },
      });
      return aux.map((item) => item.machineUnit);
    },
    getAllSchedules: async () => {
      const res = await prisma.schedule.findMany();
      if (res.length === 0) {
        await prisma.schedule.createMany({
          data: schedulesJson.schedules,
        });
      }
      return await prisma.schedule.findMany();
    },
    getScheduleAvailable: async () => {
      const schedules = await prisma.schedule.findMany({
        where: {
          machineUnitsOnSchedule: {
            some: {
              state: 'available',
            },
          },
        },
      });

      const result = schedules.reduce((acc, item) => {
        if (
          !acc.find(
            (element) => item.day === element.day && item.hour === element.hour
          )
        ) {
          acc.push(item);
        }
        return acc;
      }, []);

      return result;
    },
    getDiaryById: async (parent, args) =>
      await prisma.diary.findUnique({
        where: {
          id: args.id,
        },
        include: {
          schedules: true,
          machineUnits: {
            include: {
              machine: true,
            },
          },
        },
      }),
  },
  Mutation: {
    createDiary: async (parent, args) => {
      const diary = await prisma.diary.create({
        data: {
          name: args.diary.name,
          firstDate: args.diary.firstDate,
          lastDate: args.diary.lastDate,
          machinesCount: args.diary.machinesCount,
          schedules: {
            connect: args.diary.schedules,
          },
          machineUnits: {
            connect: args.diary.machineUnits,
          },
        },
      });
      args.diary.schedules.forEach(async (element) => {
        await prisma.schedule.update({
          where: {
            id: element.id,
          },
          data: {
            machineUnitsOnSchedule: {
              createMany: {
                data: args.diary.machineUnits.map((item) => ({
                  machineUnitId: item.id,
                })),
              },
            },
          },
        });
      });
      return diary;
    },
    createSchedules: async (parent, args) =>
      await prisma.schedule.createMany({
        data: args.schedules,
      }),

    updateDiary: async (parent, args) => {
      await prisma.machineUnitOnSchedule.deleteMany({
        where: {
          machineUnit: {
            Diary: {
              id: args.diary.id,
            },
          },
        },
      });

      await prisma.diary.update({
        where: {
          id: args.diary.id,
        },
        data: {
          name: {
            set: args.diary.name,
          },
          machinesCount: {
            set: args.diary.machinesCount,
          },
          firstDate: {
            set: args.diary.firstDate,
          },
          lastDate: {
            set: args.diary.lastDate,
          },
          schedules: {
            set: args.diary.schedules,
          },
          machineUnits: {
            set: args.diary.machineUnits,
          },
        },
      });

      args.diary.schedules.forEach(async (element) => {
        await prisma.schedule.update({
          where: {
            id: element.id,
          },
          data: {
            machineUnitsOnSchedule: {
              createMany: {
                data: args.diary.machineUnits.map((item) => ({
                  machineUnitId: item.id,
                })),
              },
            },
          },
        });
      });
    },
    deleteDiary: async (parent, args) => {
      await prisma.machineUnitOnSchedule.deleteMany({
        where: {
          machineUnit: {
            Diary: {
              id: args.id,
            },
          },
        },
      });
      return await prisma.diary.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};

export { DiaryResolvers };
