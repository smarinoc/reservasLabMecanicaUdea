/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');

const DiaryResolvers = {
  Diary: {
    schedules: async (parent) =>
      await prisma.schedule.findMany({
        where: {
          diaryId: parent.id,
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
          countAvailable: {
            gt: 0,
          },
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
    getAllSchedules: async () => await prisma.schedule.findMany(),
    getScheduleAvailable: async () => {
      const schedules = await prisma.schedule.findMany({
        where: {
          machineUnitsOnSchedule: {
            some: {
              countAvailable: {
                gt: 0,
              },
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
      }),
  },
  Mutation: {
    createDiary: async (parent, args) => {
      const diary = await prisma.diary.create({
        data: {
          name: args.diary.name,
          machinesCount: args.diary.machinesCount,
          schedules: {
            connect: args.schedules,
          },
          machineUnits: {
            connect: args.machineUnits,
          },
        },
      });
      args.diary.schedules.forEach(async (element) => {
        await prisma.machineUnitOnSchedule.createMany({
          data: args.diary.machineUnits.map((element2) => ({
            scheduleId: element.id,
            machineUnitId: element2.id,
            countAvailable: element2.count,
          })),
        });
      });
      return diary;
    },
    createSchedules: async (parent, args) =>
      await prisma.schedule.createMany({
        data: args.schedules,
      }),
  },
};

export { DiaryResolvers };
